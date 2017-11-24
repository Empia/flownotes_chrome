var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = new Schema({ 
  title:String,
  content_desc:String,
  content_type: String,
  content_value: String,
  inPageId:String,
  inContent:String,
  labels:{ type: Array, default: []};// <ILabels>;
  userId:String;
  userProvider: String;
  meta:{ type: Array, default: []},// <IMeta>;
  states:{ type: Array, default: []},// <IConState>;
  order: { type: Number, default: 0 },  
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
 });



var ObjectTypeModel = mongoose.model('object_types', schema);

export const removeObjectType = ((id) => ObjectTypeModel.findByIdAndRemove() );
export const findObjectType = ((id) => ObjectTypeModel.find({"_id": id}) );
export const findObjectTypes = (() => ObjectTypeModel.find({}) );
export const saveObjectType = ((obj_type) => new ObjectTypeModel(obj_type).save() );
