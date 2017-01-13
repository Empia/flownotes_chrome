import * as React from "react";
import * as ReactDOM from "react-dom";
import {GroceryItemList} from './components/items/GroceryItemList';
import {AboutApplication} from './components/about/AboutApplication';
import PagesContainer from './components/pages/PagesContainer';
import UserModes from './components/user_modes/UserModes';
import FocusedPageContainer from './components/page/FocusedPageContainer';
import {groceryItemStore, Item} from './stores/GroceryItemStore';
import {card,addingPage,pages} from './stores/pages/FlowPageStore';
import {pagesStore} from './stores/pages/OldFlowPageStore';
import {addingPageContent,pageContents} from './stores/page/FlowPageContentStore';
import { dialogReducer } from 'redux-dialog';
import {userReducer} from './stores/userReducer'
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

import {fetchPages} from './stores/pages/PagesActions';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";
import {syncHistoryWithStore, routerReducer, routerActions, routerMiddleware} from "react-router-redux";
import {createStore,
  applyMiddleware,
  combineReducers,
  compose,
Middleware,} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';
import {Provider} from "react-redux";
import { reducer as formReducer } from 'redux-form';
import {UserIsAuthenticated} from './utils/wrappers';

import {persistStore, getStoredState,createPersistor, autoRehydrate} from 'redux-persist'
import * as io from 'socket.io-client';
/*
var socket = io('ws://localhost:7777/websocket');
socket.on('connect', function(){console.log("Соединение установлено.");});
socket.on('event', function(data){console.log("Получены данные " + data);});
socket.on('disconnect', function(){console.log('Соединение закрыто чисто');});
*/


//import * as authStateReducer from './redux-auth/src/actions/authenticate';

//require('style!css!foundation-sites/dist/css/foundation.min.css');
($(document) as any).foundation();

const loggerMiddleware = createLogger();
const routingMiddleware = routerMiddleware(browserHistory)

//console.log('authStateReducer', authStateReducer);

const initialState = {
  card: {
    t: 'fire',
    isPageContentsFetching: false,
    page_content: []
  }
}



const autoRehydrateVal = autoRehydrate()
export const store = createStore(combineReducers({
  card, 
  addingPage, 
  pages, 
  addingPageContent,
  pageContents, 
  autoRehydrateVal,
  user: userReducer,
  dialogReducer: dialogReducer,
  routing: routerReducer, form: formReducer }),
    initialState,
    applyMiddleware(
    routingMiddleware,  
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ));
const history = syncHistoryWithStore(browserHistory, store);
persistStore(store);

const persistConfig = { /* ... */ }
getStoredState(persistConfig, (err, restoredState) => {
  // restore user
  console.log('restoredState',restoredState)
})

//store.subscribe( () => console.log(store.getState() ))


function render(){
  console.log('items main');
	ReactDOM.render(<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={PagesContainer}>
                <Route path="/page/:pageId" component={FocusedPageContainer} />
                <Route path="/foo" component={UserIsAuthenticated(AboutApplication)}/>
                <Route path="/about" component={AboutApplication} />
                <Route path="/modes" component={UserModes} />

                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />

        </Route>

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
  //console.log('user', store.getState().user);
  render() 
});
