import * as React from "react";
import * as ReactDOM from "react-dom";
import {GroceryItemList} from './components/GroceryItemList';
import PagesContainer from './components/PagesContainer';
import {groceryItemStore} from './stores/GroceryItemStore';
import {card,addingPage,pages} from './stores/FlowPageStore';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";
import {syncHistoryWithStore, routerReducer} from "react-router-redux";
import {createStore,
  applyMiddleware,
  combineReducers,
  compose,
Middleware,} from 'redux';
import {Item} from  './stores/GroceryItemStore';
import {Provider} from "react-redux";





//reducers.routing = routerReducer;
export const store = createStore(combineReducers({card,addingPage,pages, routing: routerReducer}));
const history = syncHistoryWithStore(browserHistory, store);

store.subscribe( () => console.log(store.getState() ))


function render(){
  console.log('items main');
	ReactDOM.render(<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={PagesContainer} />
    </Router>
    </Provider>, document.getElementById('app'));
  //  ReactDOM.render(<GroceryItemList  items={items} />, document.getElementById('app'));
}

//groceryItemStore.onChange(render);


render();
store.subscribe(() => {
  console.log('rerender');
  render() 
});
