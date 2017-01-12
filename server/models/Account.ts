import {Mongoose, Schema, model,Document} from 'mongoose';
var passportLocalMongoose = require('passport-local-mongoose');


interface IAccounts extends Document {
  username: string;
  email: string;
  password: string;
  id?:string;
  createdAt?:Date;
  updatedAt?:Date;
}


let AccountSchema = new Schema({
  username: String,
  email: {
      type: String,
      unique: true,
      required: true
  },
  password: String,
  id:String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

let Accounts = model<IAccounts>('Accounts', AccountSchema, "accounts");
//Accounts.plugin(passportLocalMongoose);

export {Accounts, IAccounts};

