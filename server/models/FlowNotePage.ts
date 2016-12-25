import {Mongoose, Schema, model,Document} from 'mongoose';
import {ILabels} from './FlowNoteContent';

interface IFlowNotePage extends Document {
	title:string;
  inPageId?:string;
  labels:Array<ILabels>;
	id?:string;
  order?:number;
}


let FlowNotePageSchema = new Schema({
	title:String,
  inPageId: {type: String, required: false},
  labels:[{
        value: { type: String},
        name: { type: String}
  }],
	id:String,
  order: {type: Number, required: false},
});

let FlowNotePage = model<IFlowNotePage>('FlowNotePage', FlowNotePageSchema, "flowNotePages");

export {FlowNotePage, IFlowNotePage};