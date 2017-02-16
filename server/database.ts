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

connect('mongodb://localhost/flownotes', {
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectionTimeout: 0
    }
  }
});

export {};
