/// <reference path="../typings/globals/mongoose/index.d.ts" />
import {Mongoose, connect, connection} from "mongoose";
import {FlowNotePage, IFlowNotePage} from './models/FlowNotePage';
import {FlowNoteContent, IFlowNoteContent} from './models/FlowNoteContent';


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
const db = connect(config.mongoUrl, {
  server: {
    socketOptions: {
      socketTimeoutMS: 6000,
      connectionTimeout: 6000
    }
  }
});
//db.on('error', console.error.bind(console, 'error connecting with mongodb database:'));
connection.once('open', function() {
  console.log('connected to mongodb database');
});    

console.log('connection on', connection.on);
connection.on('disconnected', function () {
   //Reconnect on timeout
   console.log('timeout')
   connect(config.mongoUrl,
                            {
                              server: {
                                socketOptions: {
                                  socketTimeoutMS: 6000,
                                  connectionTimeout: 6000
                                }
                              }
                            });
   
});

export {db, conn};
