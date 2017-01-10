import {Mongoose, Schema, model,Document} from 'mongoose';


interface IUserModes extends Document {
  title:string;
  id?:string;
  createdAt?:Date;
  updatedAt?:Date;
}


let UserModesSchema = new Schema({
  title:String,
  id:String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

let UserModes = model<IUserModes>('UserModes', UserModesSchema, "userModes");

export {UserModes, IUserModes};
