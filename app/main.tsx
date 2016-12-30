import * as React from "react";
import * as ReactDOM from "react-dom";
import {GroceryItemList} from './components/items/GroceryItemList';
import {AboutApplication} from './components/about/AboutApplication';
import PagesContainer from './components/pages/PagesContainer';
import FocusedPageContainer from './components/page/FocusedPageContainer';
import {groceryItemStore, Item} from './stores/GroceryItemStore';
import {card,addingPage,pages} from './stores/pages/FlowPageStore';
import {pagesStore} from './stores/pages/OldFlowPageStore';
import {addingPageContent,pageContents} from './stores/page/FlowPageContentStore';
import { dialogReducer } from 'redux-dialog';

import {fetchPages} from './stores/pages/PagesActions';


import { Router, Route, Link, browserHistory, withRouter } from "react-router";
import {syncHistoryWithStore, routerReducer} from "react-router-redux";
import {createStore,
  applyMiddleware,
  combineReducers,
  compose,
Middleware,} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';
import {Provider} from "react-redux";
import { reducer as formReducer } from 'redux-form';

//import * as authStateReducer from './redux-auth/src/actions/authenticate';

//require('style!css!foundation-sites/dist/css/foundation.min.css');
($(document) as any).foundation();

const loggerMiddleware = createLogger();

//console.log('authStateReducer', authStateReducer);

const initialState = {
  card: {
    t: 'fire',
    isPageContentsFetching: false,
    page_content: []
  }
}

export const store = createStore(combineReducers({
  card, 
  addingPage, 
  pages, 
  addingPageContent,
  pageContents, 
  dialogReducer: dialogReducer,
  routing: routerReducer, form: formReducer }),
    initialState,
  
    applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ));
const history = syncHistoryWithStore(browserHistory, store);

//store.subscribe( () => console.log(store.getState() ))


function render(){
  console.log('items main');
	ReactDOM.render(<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={PagesContainer}>
                <Route path="/page/:pageId" component={FocusedPageContainer} />
        </Route>
        <Route path="/about" component={AboutApplication} />

    </Router>
    </Provider>, document.getElementById('app'));
  //  ReactDOM.render(<GroceryItemList  items={items} />, document.getElementById('app'));
}

//groceryItemStore.onChange(render);

store.dispatch(fetchPages()).then(() =>
   console.log('store.getState ',store.getState())
)


render();
store.subscribe(() => {
  //console.log('rerender');
  render() 
});
