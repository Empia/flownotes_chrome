const Telegraf = require('telegraf'),
  LocalSession = require('telegraf-session-local')
const { Markup, reply } = require('telegraf');
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow');
const { Scene, enter, leave } = TelegrafFlow
const TelegrafWit = require('telegraf-wit');
require('shelljs/global');
import database from './database';


import startScene from './bot/commands/start';
import {BOT_TOKEN} from './constants';

const flow = new TelegrafFlow(
  [startScene], { 
    sessionName: 'data', ttl: 0 
});


const app = new Telegraf(BOT_TOKEN);
app.use(commandParts());

// Name of session property object in Telegraf Context (default: 'session')
export const sessionProperty = 'data'
export const localSession = new LocalSession({
  // Database name/path, where sessions will be located (default: 'sessions.json')
  database: 'example_db.json',
  // Name of session property object in Telegraf Context (default: 'session')
  property: 'session',
  // Type of lowdb storage (default: 'storagefileAsync')
  storage: LocalSession.storagefileAsync,
  // Format of storage/database (default: JSON.stringify / JSON.parse)
  format: {
    serialize: (obj) => JSON.stringify(obj, null, 2), // null & 2 for pretty-formatted JSON
    deserialize: (str) => JSON.parse(str),
  },
  // We will use `messages` array in our database to store user messages using exported lowdb instance from LocalSession via Telegraf Context
  state: { messages: [] }
})
app.use(localSession.middleware(sessionProperty));

//app.use(Telegraf.memorySession());
app.use(flow.middleware())
app.use(commandParts());
//app.use(Telegraf.log())



app.command('start', enter('start'));

app.command('scene', ctx => console.log(ctx.flow));




// confirm order
app.command('confirm', (ctx) => ctx.reply('confirm'))


console.log('sessionProperty',sessionProperty);
app.command('/stats', (ctx) => {
  console.log('ctx.data', ctx.data);
  let msg = `Using session object from [Telegraf Context](http://telegraf.js.org/context.html) (\`ctx\`), named \`${sessionProperty}\`\n`
     msg += `Database has \`${ctx[sessionProperty].counter}\` messages from @${ctx.from.username}`
  ctx.replyWithMarkdown(msg)
});
app.command('/remove', (ctx) => {
  ctx.replyWithMarkdown(`Removing session from database: \`${JSON.stringify(ctx[property])}\``)
  // Setting session to null, undefined or empty object/array will trigger removing it from database
  ctx[sessionProperty] = null
});

app.on('text', (ctx, next) => {
  ctx[sessionProperty].counter = ctx[sessionProperty].counter || 0
  ctx[sessionProperty].counter++
  // Writing message to Array `messages` into database which already has sessions Array
  ctx[sessionProperty + 'DB'].get('messages').push([ctx.message]).write()
  // `property`+'DB' is a name of property which contains lowdb instance (`dataDB`)
  return next()
})
app.use(flow.middleware())

app.use(commandParts());
app.startPolling()



console.log('NOTER IS RUNNING');  
console.log(`on token ${BOT_TOKEN}`)
console.log('***************');
console.log('***************');
console.log('database', database);


