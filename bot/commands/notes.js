const { Markup, reply } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow');
const { Scene, enter, leave } = TelegrafFlow
const {getMetadata, metadataRules} = require('page-metadata-parser');
var MetaInspector = require('node-metainspector');
const normalizeUrl = require('normalize-url');

import {removeNote,
findNote,
findNotes,
saveNote, NoteModel} from '../models/Notes';

const noteScene = new Scene('notes');

const keyboard = Markup
    .keyboard([
      ['Свежие', 'Коллекции', 'Активность'], // '☸ Setting',  Row2 with 2 buttons
      ['Назад']
    ])
    .oneTime()
    .resize()
    .extra()

noteScene.enter((ctx) => { 
	ctx.reply(`Скидывайте сюда ссылки и я добавлю их в коллекцию`, keyboard);
});
noteScene.leave((ctx) => { 
	ctx.reply(`Вы добавили ${5} ссылок`);
});



const addNoteByUrl = (url, userId) => {
	console.log('addNoteByUrl', url);
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



noteScene.hears('Свежие', (ctx) => {
	findNotes().then((notes) => {
		notes.map(note => ctx.reply(note));
	})
})


noteScene.hears('Назад', (ctx) => {
	ctx.flow.enter('start');
});




noteScene.on('message', (ctx) => {
  console.log('onMessage', ctx.message.text);
  let telegramLogin =  ctx.chat.username
  let url = ctx.message.text 
  if (url !== undefined && url !== "") {
	  saveNote(addNoteByUrl(url, telegramLogin)).then((c) => {
	  	  ctx.reply('Added')

	  })
  } else {
  	  ctx.reply('Incorrect url')
  }

});

export default noteScene;