const { Markup, reply } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow');
const { Scene, enter, leave } = TelegrafFlow
import {saveFeedback} from '../models/feedback';

////////

const feedbackScene = new Scene('feedback');

feedbackScene.enter((ctx) => { 
	ctx.reply(`Привет! Оставьте отзыв и мы свяжемся с вами.`);
});

feedbackScene.on('message', (ctx) => {
	// create feedback
	saveFeedback({telegramLogin: ctx.chat.username, message: ctx.message.text }).then(f => { console.log(f) });
	ctx.reply('Спасибо');
	ctx.flow.enter('start');
});

export default feedbackScene;

