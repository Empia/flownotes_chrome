const { Markup, reply } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow');
const { Scene, enter, leave } = TelegrafFlow

const noteScene = new Scene('notes');
noteScene.enter((ctx) =>  ctx.reply(`Выберите язык / Language selector`, keyboard));

const keyboard = Markup
    .keyboard([
      ['English', 'Русский'], // '☸ Setting',  Row2 with 2 buttons
    ])
    .oneTime()
    .resize()
    .extra()


noteScene.on('message', (ctx) => {
	// create feedback
	if (ctx.message.text == "English") {
	  ctx['data'].language = "en";
	  ctx.reply('Awesome!');
	  ctx.flow.enter('start');
	} 
	if (ctx.message.text == "Русский") {
	  ctx['data'].language = "ru";
	  ctx.reply('Круто!');
	  ctx.flow.enter('start');
	} else {

	}
});

export default noteScene;