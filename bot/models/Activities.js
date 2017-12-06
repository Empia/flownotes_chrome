var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = new Schema({ 
  title:String,
 
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
 });

var ActivitiyModel = mongoose.model('activities', schema);

export const removeActivity = ((id) => ActivitiyModel.findByIdAndRemove() );
export const findActivity = ((id) => ActivitiyModel.find({"_id": id}) );
export const findActivities = (() => ActivitiyModel.find({}) );
export const saveActivity = ((activity) => new ActivitiyModel(activity).save() );
