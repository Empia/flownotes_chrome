import {Mongoose, Schema, model,Document} from 'mongoose';


interface IGlobalUrls extends Document {
  url:string;
  id?:string;
  userId?:string;
  createdAt?:Date;
  updatedAt?:Date;
}


let UserModesSchema = new Schema({
  url:String,
  id:String,
  userId:String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

let GlobalUrls = model<IGlobalUrls>('GlobalUrls', UserModesSchema, "globalUrls");

export {GlobalUrls, IGlobalUrls};
