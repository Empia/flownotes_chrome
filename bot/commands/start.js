const { Markup, reply } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow');
const { Scene, enter, leave } = TelegrafFlow
import {mainScreenMessage, welcomeMessage} from '../../constants';
import {findActivities, saveActivity} from '../models/Activities';

var betaSubscribers = [];

class BetaSubscriber {
	constructor(login) {
		this.login = login;
		this.createdAt = new Date;
	}
}

const addSubscriber = (ctx) => {
	let login = ctx.update.message.from.username;
	betaSubscribers = betaSubscribers.filter((c) => c !== login).concat([login]);
}


////////

const startScene = new Scene('start')
const keyboard = Markup
    .keyboard([
      ['🔍 Notes','🚀 Activities'], // '😎 Guides', '👥 Job board' Row1 with 2 buttons
      ['📞 Feedback', '☸ Settings'], // '☸ Setting',  Row2 with 2 buttons
    ])
    .oneTime()
    .resize()
    .extra()


startScene.enter((ctx) => { 
    ctx.reply(welcomeMessage, keyboard);
    ctx.reply(mainScreenMessage, keyboard);
    //ctx.reply(`Мы в открытой бете, оставьте заявку на участие`, keyboard);
});


startScene.hears('🔍 Notes', enter('notes'));
startScene.hears('📞 Feedback', enter('feedback'));
startScene.hears('☸ Settings', enter('settings'));
startScene.hears('🚀 Activities', enter('activities'));



startScene.command('test_create', (ctx) => {
    saveActivity({
      title: 'test activity'
     }).then((c) => {
        ctx.reply('created');
     });
});

startScene.command('test', (ctx) => {
    //console.log(findActivities());
    findActivities().then(c => {
        console.log('collection');
        console.log(c);
        ctx.reply(c);
    });
});


export default startScene;