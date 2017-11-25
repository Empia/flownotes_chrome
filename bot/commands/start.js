const { Markup, reply } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow');
const { Scene, enter, leave } = TelegrafFlow

var betaSubscribers = [];

class BetaSubscriber {
	constructor(login) {
		this.login = login;
		this.createdAt = new Date;
	}
}
const addSubscriber = (ctx) => {
	let login = ctx.update.message.from.username;

	console.log('ctx', login);
	betaSubscribers = betaSubscribers.filter((c) => c !== login).concat([login]);
	console.log('betaSubscribers', betaSubscribers);
}


////////

const startScene = new Scene('start')
const keyboard = Markup
    .keyboard([
      ['🔍 Servers'], // '😎 Guides', '👥 Job board' Row1 with 2 buttons
      ['📞 Feedback', '☸ Setting'], // '☸ Setting',  Row2 with 2 buttons
    ])
    .oneTime()
    .resize()
    .extra()
const keyboardBeta = Markup
    .keyboard([
      ['Записаться'], // Row1 with 2 buttons
    ])
    .oneTime()
    .resize()
    .extra()
const keyboardEmppty = Markup
    .keyboard([
      ['Записаться'], // Row1 with 2 buttons
    ])
    .oneTime()
    .resize()
    .extra()

startScene.enter((ctx) => { 
    ctx.reply(mainScreenMessage, keyboard);
    //ctx.reply(`Мы в открытой бете, оставьте заявку на участие`, keyboard);
});

startScene.hears('Записаться', (ctx) => {
	// add to subscribers 
	addSubscriber(ctx);
	ctx.reply('Спасибо! Мы с вами свяжемся', Markup.removeKeyboard().extra())
});

startScene.hears('😎 Guides', ctx => ctx.reply('Guides!', keyboard))
startScene.hears('👥 Job board', ctx => ctx.reply('Job board', keyboard))
startScene.hears('📞 Feedback', enter('feedback'));
startScene.hears('☸ Setting', enter('settings'));



export default startScene;