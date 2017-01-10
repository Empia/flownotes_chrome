import {Mongoose, Schema, model,Document} from 'mongoose';

export interface ILabels {
value: string;
name: string;
}
export interface IConState {
  name: string;
  ison: boolean;
  ison_rate: number;
  opposite?:string;
}

interface IFlowNoteContent extends Document {
  title:string;
  content_type: string;
  content_value: string;
  inPageId?:string;
  inContent?:string;
  labels:Array<ILabels>;
  id?:string;

  states:Array<IConState>;

  inPagesIds?:Array<string>;
  order?:number;  

  createdAt?:Date;
  updatedAt?:Date;  
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
  states:[{
        name: { type: String},
        ison: { type: Boolean},
        ison_rate: { type: Number},
        opposite: { type: String, required: false}
  }],  
  id:String,
  order: {type: Number, required: false},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  
});

let FlowNoteContent = model<IFlowNoteContent>('FlowNoteContent', FlowNoteContentSchema, "flowNoteContents");

export {FlowNoteContent, IFlowNoteContent};