const { Markup, reply } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow');
const { Scene, enter, leave } = TelegrafFlow
import {saveFeedback} from '../models/feedback';

////////

const feedbackScene = new Scene('feedback');

feedbackScene.enter((ctx) => { 
	ctx.reply(`Hey! Please send your feedback about me. It will really helpful and I promise that I will be better`);
});

feedbackScene.on('message', (ctx) => {
	ctx.flow.enter('start');
});

export default feedbackScene;

