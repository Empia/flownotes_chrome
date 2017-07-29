var fs = require('fs');

// commands.ts
// auth
// help
// global state of mode

// MODE ONE: link paster
// MODE TWO: fetch
interface resolvedCommandObject {
  resolved: boolean,
  cmd?:string
}
interface responseExecutedCommandObject {
  response: string
  responses?:string[]
  caption?: string
}


var modeStorage = [];
// MODE CRUD
function fetchMode(userID) {
  var mode = modeStorage.find(c => c.userID === userID);
  if (mode) {
    return mode;
  } else {
    mode = {userID: userID, current_mode: 'append'}
    modeStorage.push(mode);
    return mode;
  }
}
function switchMode(userID, modeId) {
  var mode = modeStorage.find(c => c.userID === userID);
  if (mode) {
    modeStorage = modeStorage.filter(c => !(c.userID === userID));
    mode = {userID: userID, current_mode: modeIdGet(modeId) }
    modeStorage.push(mode)
    return mode;
  } else {
    mode = {userID: userID, current_mode: 'append'}
    modeStorage.push(mode)
  }  
}
function modeIdGet(modeId):string {
  if (modeId === 'append') {
    return 'append'
  } else {
    return 'fetchend'
  }
}


var linkStorage = [];
// LINK CRUD
function addLink(userID, link) {
  var cleanUrl = link
  linkStorage.push({userID: userID, link: link});
  return cleanUrl;
}
function fetchLink(userID) {
  return linkStorage.filter(c => c.userID === userID);
} 
function removeLink(userID, linkId) {
  console.log('remove link', linkId, linkStorage)
  linkStorage = linkStorage.filter(function(c) {
    return !(c.link.id == linkId && c.userID === userID)
   }); 
  return linkStorage;
} 
function setLinkId(userID):number {
  if (linkStorage.length === 0) {
    return 1;
  } else {
    return linkStorage[linkStorage.length-1].link.id+1
  }
};

const commands = {
  start: function(msg:any):responseExecutedCommandObject {
    console.log('welcome');
    return { response: 'welcome '+msg.chat.first_name+' You have got: '+linkStorage.length+' links. If you need help type /help' };
  },
  help: function(msg:any):responseExecutedCommandObject {
    console.log('welcome');
    var answer = `Commands:
  /add https://.... Append URL
  /fetch Show all URLs
  /remove URL_id remove URL
Have fun and rock this world!`;
    return { response: answer };
  },

  list: function(msg: any):responseExecutedCommandObject {
    console.log('list links');
    var content = fs.readFileSync('bulk2.txt');
    return { response: content, responses: content.toString().split('\n') };
  },

///////////////////////////////////////////////////// LINK CRUD
addLink: function(msg:any):responseExecutedCommandObject {
  console.log('addLink');
  var newLink = msg.text.toString().split(' ')[1];
  var userID = msg.chat.id;
  var newId = setLinkId(userID)
  addLink(msg.chat.id, {id: newId, url: newLink})
  return { response: 'Got it' };
},
fetchLinks: function(msg:any):responseExecutedCommandObject {
  console.log('fetchLinks');
  return { response: 'result: '+JSON.stringify(fetchLink(msg.chat.id)) };
},
removeLink: function(msg:any):responseExecutedCommandObject {
  console.log('fetchLinks')    
  var linkId = msg.text.toString().split(' ')[1];  
  removeLink(msg.chat.id, linkId);
  return { response: 'removed '+msg.text.toString() };
},

/////////////////////////////////////////////////// MODE CRUD
currentMode: function(msg:any):responseExecutedCommandObject {
  console.log('currentMode');
  return {response: 'currentMode '+fetchMode(msg.chat.id).current_mode };
},
switchMode: function(msg:any):responseExecutedCommandObject {
  console.log('switchMode');
  var newMode = msg.text.toString().split('/')[1];
  switchMode(msg.chat.id, newMode);
  return {response: 'switchMode to '+newMode};
},


///////////////////////////////////////
  resolveCmd: function(cmdText):resolvedCommandObject {
    if (cmdText === "/start") {
      return {resolved: true, cmd: 'start' }
    } 
    if (cmdText === "/list") {
      return {resolved: true, cmd: 'list' }
    } 
    if (cmdText === "/help") {
      return {resolved: true, cmd: 'help' }
    }     
    if (cmdText.split(' ')[0] !== undefined && cmdText.split(' ')[0] === "/add") {
      return {resolved: true, cmd: 'addLink' }
    } 
    if (cmdText === "/fetch") {
      return {resolved: true, cmd: 'fetchLinks' }
    } 
    if (cmdText.split(' ')[0] !== undefined && cmdText.split(' ')[0] === "/remove") {
      return {resolved: true, cmd: 'removeLink' }
    }
    if (cmdText === "/mode") {
      return {resolved: true, cmd: 'currentMode' }
    }
    if (cmdText.split(' ')[0] !== undefined && cmdText.split(' ')[0] === "/switchMode") {
      return {resolved: true, cmd: 'switchMode' }
    }             
    else {
      return {resolved: false }
    }
  }
}
export {commands};