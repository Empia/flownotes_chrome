import * as React from "react";
import * as ReactDOM from "react-dom";
import {GroceryItemList} from './components/GroceryItemList';
import PagesContainer from './components/PagesContainer';
import FocusedPageContainer from './components/FocusedPageContainer';
import {groceryItemStore} from './stores/GroceryItemStore';
import {card,addingPage,pages,pagesStore} from './stores/FlowPageStore';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";
import {syncHistoryWithStore, routerReducer} from "react-router-redux";
import {createStore,
  applyMiddleware,
  combineReducers,
  compose,
Middleware,} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';
import {fetchPages} from './stores/Actions';
import {Item} from  './stores/GroceryItemStore';
import {Provider} from "react-redux";

//require('style!css!foundation-sites/dist/css/foundation.min.css');
($(document) as any).foundation();

const loggerMiddleware = createLogger();

export const store = createStore(combineReducers({card,addingPage,pages, routing: routerReducer}),
    applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ));
const history = syncHistoryWithStore(browserHistory, store);

store.subscribe( () => console.log(store.getState() ))


function render(){
  console.log('items main');
	ReactDOM.render(<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={PagesContainer}>
                <Route path="/page/:pageId" component={FocusedPageContainer} />
        </Route>
        <Route path="/items" component={GroceryItemList} />

    </Router>
    </Provider>, document.getElementById('app'));
  //  ReactDOM.render(<GroceryItemList  items={items} />, document.getElementById('app'));
}

//groceryItemStore.onChange(render);

store.dispatch(fetchPages()).then(() =>
  console.log(store.getState())
)


render();
store.subscribe(() => {
  console.log('rerender');
  render() 
});
