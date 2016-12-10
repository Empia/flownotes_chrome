import {Mongoose, Schema, model,Document} from 'mongoose';

interface IGroceryItem extends Document {
	purchased?:boolean;
	title:string;
	id?:string;
}


let GroceryItemSchema = new Schema({
	title:String,
	purchased:Boolean,
	id:String,
});

let GroceryItem = model<IGroceryItem>('GroceryItem', GroceryItemSchema, "groceryItems");

export {GroceryItem, IGroceryItem};