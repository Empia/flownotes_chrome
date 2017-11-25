const Telegraf = require('telegraf'),
  LocalSession = require('telegraf-session-local')
const { Markup, reply } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const TelegrafFlow = require('telegraf-flow')
const { Scene, enter, leave } = TelegrafFlow
const TelegrafWit = require('telegraf-wit')
require('shelljs/global');
import database from './database';

import startScene from './bot/commands/start';
import settingsScene from './bot/commands/settings'

const BOT_TOKEN = '477224067:AAEc-vWiNMlnxYnUIHXsJ6vZqrqznFlIXTw';
const flow = new TelegrafFlow([startScene, settingsScene], { ttl: 10 });
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

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('Response time %sms', ms)
})



app.command('start', enter('start'));
app.command('scene', ctx => console.log(ctx.flow));
app.command('language', ((ctx) => ctx.reply(ctx[sessionProperty].language) ));


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



/////////////////////////////////////////////////////////


var express = require('express');
var webapp = express();
webapp.get('/test/:id', function (req, res) {
  let par = req.param('id')
  heys.push(par  )
  console.log(par)
  res.send(par);
});
webapp.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});





app.command('start', ({ from, reply }) => {
  console.log('start', from)
  return reply('Welcome!')
});

app.startPolling()


console.log('NOTER IS RUNNING');  
console.log('***************');
console.log('***************');
console.log('database', database);




var mongoose = require('mongoose');
var repository = function (modelName) {
  var self = this;
  self.Model = require('../models/' + modelName);
  self.FindById = function (id, cb) {
    self.FindOne({
      _id : id
    }, function(err, entity) {
      cb(err, entity);
    });
  };

  self.FindOne = function (params, cb) {
    self.Model.findOne(params, function (err, entity) {
      if (!err && !entity) {
        err = true;
      }

      cb(err, entity);
    });
  };

  self.FindAll = function (params, cb, lean) {
    if (!lean) {
        self.Model.find(params).exec(cb);
    } else {
        self.Model.find(params).lean().exec(cb);
    }
  };

  self.Save = function (obj, cb) {
    var entity = new self.Model(obj);
    entity.save(function (err) {
      cb(err);
    });
  };

  self.Update = function (entity, cb) {
    self.FindById(entity.id, function (err, oldEntity) {
      if (err) {
        cb(err);
      } else {
          oldEntity = entity;
          oldEntity.save(cb);
      }
    })
  };

  self.Delete = function (entity, cb) {
    entity.remove(function (err) {
      cb(err);
    });
  };
};

repository.GetModel = function (modelName) {
  return mongoose.model(modelName);
};

module.exports.Repository = repository;




/*
> url > operation



> shoutbox > urls > to collections :: to activity tags
> collections > urls
> activities > urls

url >
> save to collection
> later to shoutbox
> later to activity

activity > brief description when you need to use this url

*/


