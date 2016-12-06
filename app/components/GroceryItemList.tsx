import * as React from "react";
import {GroceryItem} from './GroceryItem';
import {GroceryListAddItem} from './GroceryListAddItem';
import {Item} from  '../stores/GroceryItemStore';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {groceryItemStore} from '../stores/GroceryItemStore';


interface GroceryItemListProps extends React.Props<any>{
	items:Array<Item>;
}

interface GroceryItemListState{
	
}

class GroceryItemList extends React.Component<GroceryItemListProps, GroceryItemListState>{
	constructor(){
		super();
		this.items = groceryItemStore.getItems();
		console.log(this);
	}
	
	render(){
		return  (
		<div>

			 <ul>
        <li><Link to="/items">Items</Link></li>
        <li><Link to="/pages">Pages</Link></li>
      </ul>
			<h1>Grocery List</h1>
			<div>
				{this.items.map((item, idx)=> <GroceryItem item={item} key={"item" + idx}/>)}
			</div>
			<GroceryListAddItem />
		</div>
		);
	}
	
}

export {GroceryItemList}
