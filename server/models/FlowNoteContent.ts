import {Mongoose, Schema, model,Document} from 'mongoose';

export interface ILabels {
value: string;
name: string;
}

interface IFlowNoteContent extends Document {
  title:string;
  content_type: string;
  content_value: string;
  inPageId?:string;
  inContent?:string;
  labels:Array<ILabels>;
  id?:string;
}


let FlowNoteContentSchema = new Schema({
  title:String,
  content_type: String,
  content_value: String,
  inPageId: {type: String, required: false},
  inContent: {type: String, required: false},
  labels:[{
        value: { type: String},
        name: { type: String}
  }],
  id:String,
});

let FlowNoteContent = model<IFlowNoteContent>('FlowNoteContent', FlowNoteContentSchema, "flowNoteContents");

export {FlowNoteContent, IFlowNoteContent};