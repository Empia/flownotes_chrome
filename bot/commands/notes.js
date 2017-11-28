const { Markup, reply } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow');
const { Scene, enter, leave } = TelegrafFlow
const {getMetadata, metadataRules} = require('page-metadata-parser');
var MetaInspector = require('node-metainspector');
const normalizeUrl = require('normalize-url');
var validUrl = require('valid-url');

import {removeNote,
findNote,
findNotes,
saveNote, NoteModel} from '../models/Notes';

const noteScene = new Scene('notes');

const keyboard = Markup
    .keyboard([
      ['Shoutbox', 'Collections', 'By activities'], // '☸ Setting',  Row2 with 2 buttons
      ['Back']
    ])
    .oneTime()
    .resize()
    .extra()

noteScene.enter((ctx) => { 
	ctx.reply(`Send me links and I will add them to shoutbox`, keyboard);
});
noteScene.leave((ctx) => { 
	ctx.reply(`You have been added ${5} links`);
});



const addNoteByUrl = (url, userId) => {
	//console.log('addNoteByUrl', url);
		 return {title: "client.title",
						  content_desc:'',
						  content_type: 'url',
						  content_value: url,
						  inPageId:'',
						  inContent:'',
						  labels: [],
						  userId: userId,
						  userProvider: 'telegram'};
};


//removeNote = ((id) =
//findNote = ((id) =



noteScene.hears('Shoutbox', (ctx) => {
	findNotes().then((notes) => {
		notes.map(note => ctx.reply(note));
	})
});

noteScene.hears('Back', (ctx) => {
	ctx.flow.enter('start');
});




noteScene.on('message', (ctx) => {
  console.log('onMessage', ctx.message);
  let telegramLogin =  ctx.chat.username
  let url = ctx.message.text 
  if (validUrl.isUri(url)) {
	  saveNote(addNoteByUrl(url, telegramLogin)).then((c) => {
	  	  ctx.reply(`Added ${url}`, keyboard)
	  })
  } else {
  	  ctx.reply('Incorrect url', keyboard)
  }
});

export default noteScene;