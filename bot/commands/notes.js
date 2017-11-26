const { Markup, reply } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow');
const { Scene, enter, leave } = TelegrafFlow

const noteScene = new Scene('notes');

const keyboard = Markup
    .keyboard([
      ['Коллекции', 'Активность'], // '☸ Setting',  Row2 with 2 buttons
      ['Назад']
    ])
    .oneTime()
    .resize()
    .extra()

noteScene.enter((ctx) => { 
	ctx.reply(`Скидывайте сюда ссылки и я добавлю их в колленцию`, keyboard);
});
noteScene.leave((ctx) => { 
	ctx.reply(`Вы добавили ${5} ссылок`);
});

noteScene.on('message', (ctx) => {
  ctx.flow.enter('start');
});

export default noteScene;