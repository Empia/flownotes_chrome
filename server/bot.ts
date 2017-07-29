var TelegramBot = require('node-telegram-bot-api');
import {commands} from './chat_bot_core/commands';
var fs = require('fs');




const bot = {
  initiate: () => {
    const token = '371326189:AAElUEd4uwvnejKWruqn4AXIMmboiak-OUE';
    const bot = new TelegramBot(token, {workers: 1, polling: true});
    bot.on('message', function (msg) {
        var chatId = msg.chat.id;
        console.log(msg.chat.username.toString()+' '+msg.text.toString());
        var commandOpt = commands.resolveCmd(msg.text.toString());
        if (commandOpt.resolved) {
          var doneCmd = commands[commandOpt.cmd](msg)
          var response:string = doneCmd.response
          var responseCaption:string = doneCmd.caption ? doneCmd.caption : ''
          const opts = {
              reply_to_message_id: msg.message_id,
              reply_markup: JSON.stringify({
                keyboard: []
              })
            };
          bot.sendMessage(chatId, response, opts);
        } else {
          const opts = {
              reply_to_message_id: msg.message_id,
              reply_markup: JSON.stringify({
                one_time_keyboard: true,
                keyboard: [
                  ['/help'],
                  ['/mode'],
                  ['/list']
                ]
              })
            };          
          //
          var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
          var regex = new RegExp(expression);

          // find every link
          var links = msg.text.toString().match(regex);

          // append every link
          links.forEach((data) =>  fs.appendFileSync('bulk2.txt', data+'\n'))

          bot.sendMessage(chatId, 'appended', opts);
        
        }


    });

bot.onText(/\/start/, function onLoveText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      one_time_keyboard: true,
      keyboard: [
        ['English'],
        ['Russian']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, '.............?', opts);
});



bot.onText(/\/list/, function onEditableText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
  };
  bot.sendMessage(msg.chat.id, '.............?', opts);

});

/////////////////////////////////////////////
/////////////////////////////////////////////
var incTest = function(st?:string) {
  console.log('incTest', st);
  if (st !== undefined && parseInt(st)) {
    return (parseInt(st)+1)+'';
  } else {
    return '1';
  }
}
bot.onText(/\/editable/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: incTest('2'),
             // we shall check for this value when we listen
             // for "callback_query"
            callback_data: 'edit'
          }
        ]
      ]
    }
  };
  bot.sendMessage(msg.from.id, incTest('1'), opts);
});
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const textMsg = msg.text.toString()
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: incTest(incTest(textMsg)),
             // we shall check for this value when we listen
             // for "callback_query"
            callback_data: 'edit'
          }
        ]
      ]
    }
  };
  let text;

  if (action === 'edit') {
    text = incTest(incTest(textMsg));
  }

  bot.editMessageText(text, opts);
});

bot.on('polling_error', (error) => {
      console.log(error);  // => 'EFATAL'
});    


  }
}

export default bot;
