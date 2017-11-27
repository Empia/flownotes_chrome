var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = new Schema({ 
  title:String,
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
 });



var ShoutBoxModel = mongoose.model('shoutboxes', schema);

export const removeShoutbox = ((id) => ShoutBoxModel.findByIdAndRemove() );
export const findShoutbox = ((id) => ShoutBoxModel.find({"_id": id}) );
export const findShoutboxes = (() => ShoutBoxModel.find({}) );
export const saveShoutbox = ((note) => new ShoutBoxModel(note).save() );
