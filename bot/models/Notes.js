var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const schema = new Schema({ 
  title:{ type: String, default: ""},
  content_desc:{ type: String, default: ""},
  content_type: { type: String, default: ""},
  content_value: { type: String, default: ""},
  inPageId:{ type: String, default: ""},
  inContent:{ type: String, default: ""},
  labels: { type: Array, default: []},// <ILabels>;
  userId:{ type: String, default: ""},
  userProvider: { type: String, default: ""},
  meta: { type: Array, default: []},// <IMeta>;
  states: { type: Array, default: []},// <IConState>;
  order: { type: Number, default: 0 },  
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
 });



var NoteModel = mongoose.model('Notes', schema);



export const removeNote = ((id) => NoteModel.findByIdAndRemove() );
export const findNote = ((id) => NoteModel.find({"_id": id}) );
export const findNotes = (() => NoteModel.find({}) );
export const saveNote = ((note) => new NoteModel(note).save() );


