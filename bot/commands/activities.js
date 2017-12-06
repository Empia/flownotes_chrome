const { Markup, reply } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow');
const { Scene, enter, leave } = TelegrafFlow
import {findActivities, saveActivity} from '../models/Activities';

////////

const activityScene = new Scene('activities');

const keyboard = Markup
    .keyboard([
      ['Add', 'List', 'Remove'], // '☸ Setting',  Row2 with 2 buttons
      ['Back']
    ])
    .oneTime()
    .resize()
    .extra()

activityScene.enter((ctx) => { 
	ctx.reply(`Hey!`, keyboard);
});

activityScene.on('message', (ctx) => {
	ctx.flow.enter('start');
});



activityScene.hears('Add', (ctx) => {
	ctx.flow.enter('start');
});
activityScene.hears('List', (ctx) => {
	ctx.flow.enter('start');
});
activityScene.hears('Remove', (ctx) => {
	ctx.flow.enter('start');
});
/////

activityScene.hears('Back', (ctx) => {
	ctx.flow.enter('start');
});

export default activityScene;

