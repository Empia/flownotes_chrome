import * as React from "react";
import * as ReactDOM from "react-dom";
import {GroceryItemList} from './components/GroceryItemList';
import {PagesContainer} from './components/PagesContainer';
import {groceryItemStore} from './stores/GroceryItemStore';
import {FlowPageStore} from './stores/FlowPageStore';
import { Router, Route, Link, hashHistory, withRouter } from "react-router";

import {Item} from  './stores/GroceryItemStore';

interface MyComponentProps 
extends ReactRouter.RouteComponentProps<{items:Array<Item>,store: any}, { }>{
  items:Array<Item>;
  st: any;
}
interface MyComponentState{
  
}

class MyComponent extends React.Component<MyComponentProps, MyComponentState>{
    myItems = [];
    constructor(){
      super();
    }
    componentWillReceiveProps(nextProp) {
      console.log('nextProp', nextProp);
    }
    componentDidMount() {
      this.myItems = this.props.items;
      this.props.st.onChange((it) => { this.myItems = it } );
    }
    render() {
        return <GroceryItemList st={this.props.st} items={this.myItems}/>
    }
}


const Main = function(store, items) { return withRouter(
  React.createClass({

    getInitialState() {
      return {
        tacos: [
          { name: 'duck confit' },
          { name: 'carne asada' },
          { name: 'shrimp' }
        ]
      }
    },
    render() {
      return (
        <div className="App">
          <MyComponent items={items} st={store}/>
        </div>
      )
    }
  })
)
}

const routes = function(store, items) {
  return <Router history={hashHistory}>
  <Route path="/" component={Main(store, items)} />
  <Route path="/pages" component={PagesContainer} />
  <Route path="/items" component={MyComponent} />
</Router>
};

function render(groceryItemStore, items){
  console.log('items main', groceryItemStore, items);
	ReactDOM.render(routes(groceryItemStore, items), document.getElementById('app'));
  //  ReactDOM.render(<GroceryItemList  items={items} />, document.getElementById('app'));
}

groceryItemStore.onChange(render);


FlowPageStore.subscribe(() => {
  console.log('state',FlowPageStore.getState());
});


FlowPageStore.dispatch({
  type: 'ADD_PAGE',
  data: {
    front: 'front',
    back: 'back'
  }
})

render(groceryItemStore, groceryItemStore.getItems());
