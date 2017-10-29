const Telegraf = require('telegraf'),
  LocalSession = require('telegraf-session-local')
const { Markup, reply } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow')
const { Scene, enter, leave } = TelegrafFlow
const TelegrafWit = require('telegraf-wit')
require('shelljs/global');


const BOT_TOKEN = '477224067:AAEc-vWiNMlnxYnUIHXsJ6vZqrqznFlIXTw';

const greeterScene = new Scene('greeter')
greeterScene.enter((ctx) => ctx.reply('Hi'))
greeterScene.leave((ctx) => ctx.reply('Buy'))
greeterScene.hears(/hi/gi, leave())
greeterScene.on('message', (ctx) => ctx.replyWithMarkdown('Send `hi`'))

// Echo scene
const echoScene = new Scene('echo')
echoScene.enter((ctx) => ctx.reply('echo scene'))
echoScene.leave((ctx) => ctx.reply('exiting echo scene'))
echoScene.command('back', leave())
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))
const flow = new TelegrafFlow([greeterScene, echoScene], { ttl: 10 })


const app = new Telegraf(BOT_TOKEN);
app.use(Telegraf.memorySession());
app.use(flow.middleware())
app.use(commandParts());


app.command('start', ({ from, reply }) => {
  console.log('start', from)
  return reply('Welcome!')
})
app.hears('hi', (ctx) => ctx.reply('Hey there!'))
app.on('sticker', (ctx) => ctx.reply('👍'))


app.command('greeter', enter('greeter'))
app.command('echo', enter('echo'))


app.startPolling()


console.log('NOTER IS RUNNING');  
console.log('***************');
console.log('***************');
console.log('database', undefined);
