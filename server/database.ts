/// <reference path="../typings/globals/mongoose/index.d.ts" />
import {Mongoose, connect, connection} from "mongoose";
import {FlowNotePage, IFlowNotePage} from './models/FlowNotePage';
import {FlowNoteContent, IFlowNoteContent} from './models/FlowNoteContent';
var pinoObj = require('pino')
var pretty = pinoObj.pretty()
pretty.pipe(process.stdout)
var pino = pinoObj({
  name: 'app',
  safe: true
}, pretty)
var colors = require('colors/safe');
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
const pinoLogInfo = (msg) => {
  console.log(colors.warn(msg));
  return pino.info(colors.warn(msg)) 
}
const pinoLogError = (msg) => {
  return pino.warn(colors.error(msg)) 
}

function conn(){
  (<any>require('mongoose')).Promise = Promise;
	//connection.db.dropDatabase();
	
	let items = []
	
	for(let item of items){
		//new GroceryItem(item).save();
	}
}
var config = {
  mongoUrl: 'mongodb://localhost/flownotes'
}
var connected;
const db = connect(config.mongoUrl, {
  server: {
    socketOptions: {
      socketTimeoutMS: 6000,
      connectionTimeout: 6000
    },
    reconnectTries: 60 * 60 * 24, 
      reconnectInterval: 1000 
  }
});
//db.on('error', console.error.bind(console, 'error connecting with mongodb database:'));
connection.once('open', function() {
  pinoLogInfo('connected to mongodb database');
  connected = true;
});    
connection.on('connected', function (ref) {
    connected=true;
    pinoLogInfo('Connected connection to mongo server.');
});

connection.on('disconnected', function (ref) {
    connected = false;
    pinoLogError('disconnected connection.');
});
connection.on('disconnect', function (err) {
    pinoLogError('Error...disconnect'+err.toString());
});
connection.on('connecting', function (ref) {
    connected = false;
    pinoLogInfo('connecting.');
});
connection.on('error', function (ref) {
    connected = false;
    pinoLogError('Error connection.');
    //mongoose.disconnect();
    //global.mongo_conn=false;
});

connection.on('reconnected', function () {
    //global.mongo_conn=true;
    pinoLogInfo('MongoDB reconnected!');
});
connection.on('reconnecting', function () {
    //global.mongo_conn=true;
    pinoLogInfo('reconnecting!');
});

export {db, conn};
