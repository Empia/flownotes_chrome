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


