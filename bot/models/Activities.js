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

var ActivitiyModel = mongoose.model('activities', schema);

export const removeActivity = ((id) => ActivitiyModel.findByIdAndRemove() );
export const findActivity = ((id) => ActivitiyModel.find({"_id": id}) );
export const findActivities = (() => ActivitiyModel.find({}) );
export const saveActivity = ((note) => new ActivitiyModel(note).save() );
