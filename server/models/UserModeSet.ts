import {Mongoose, Schema, model,Document} from 'mongoose';


interface IUserModeSets extends Document {
id?:string;
userId:string;
userModeId:string;
createdAt?:Date;
}


let UserModeSetsSchema = new Schema({
  id:String, 
  userId:String,
  userModeId:String,
  createdAt: { type: Date, default: Date.now },  
});

let UserModeSets = model<IUserModeSets>('UserModeSets', UserModeSetsSchema, "userModeSets");

export {UserModeSets, IUserModeSets};
