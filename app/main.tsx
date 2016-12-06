import * as React from "react";
import * as ReactDOM from "react-dom";
import {GroceryItemList} from './components/GroceryItemList';
import {PagesContainer} from './components/PagesContainer';
import {groceryItemStore} from './stores/GroceryItemStore';
import { Router, Route, Link, hashHistory } from "react-router";

import {Item} from  './stores/GroceryItemStore';
interface MyComponentProps extends React.Props<any>{items:Array<Item> }
interface MyComponentState{}
/*
class MyComponent extends React.Component<MyComponentProps,MyComponentState> {
    constructor(){
      super();
      let items = groceryItemStore.getItems();
    }
    render() {
        return <GroceryItemList items={this.items}/>
    }
}
*/

const routes = (
      <Route path="/" component={GroceryItemList} />
      <Route path="/pages" component={PagesContainer} />
);


function render(items){
  console.log('items', items);

	ReactDOM.render(
   <Router history={hashHistory}>
   {routes}
  </Router>, document.getElementById('app'));

//  ReactDOM.render(<GroceryItemList  items={items} />, document.getElementById('app'));

}

groceryItemStore.onChange(render);


render(groceryItemStore.getItems());
