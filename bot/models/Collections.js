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

var NoteCollectionModel = mongoose.model('note_collection', schema);

export const removeCollection = ((id) => NoteCollectionModel.findByIdAndRemove() );
export const findCollection = ((id) => NoteCollectionModel.find({"_id": id}) );
export const findCollections = (() => NoteCollectionModel.find({}) );
export const saveCollection = ((note_collection) => new NoteCollectionModel(note_collection).save() );
