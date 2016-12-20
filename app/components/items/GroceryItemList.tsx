import * as React from "react";
import {GroceryItem} from './GroceryItem';
import {GroceryListAddItem} from './GroceryListAddItem';
import {Item} from  '../../stores/GroceryItemStore';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import {groceryItemStore} from '../../stores/GroceryItemStore';
import Header from '../commons/Header';

interface GroceryItemListPr extends React.Props<any>{
	items:Array<Item>;
  st?: any;
}

interface GroceryItemListState{	
}

class GroceryItemList extends React.Component<GroceryItemListPr, GroceryItemListState>{
	items:Array<Item> = [];
	st: any;
	constructor(){
		super();
		console.log(this);
	}

 componentDidMount () {
    // fetch data initially in scenario 2 from above
    this.items = this.props.items;
    console.log(this);
}	
 
componentDidUpdate () {
    this.items = this.props.items;
}
	
	render(){
		return  (
		<div>
		  <Header />
			<h1>Grocery List</h1>
			<div>
				{this.props.items.map((item, idx)=> <GroceryItem item={item} key={"item" + idx}/>)}
			</div>
			<GroceryListAddItem />
		</div>
		);
	}
	
}

export {GroceryItemList}
