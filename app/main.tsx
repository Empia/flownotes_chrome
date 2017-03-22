import * as React from "react";
import * as ReactDOM from "react-dom";
import {AboutApplication} from './components/about/AboutApplication';
import PagesContainer from './components/pages/PagesContainer';
import UserModes from './components/user_modes/UserModes';
import FocusedPageContainer from './components/page/FocusedPageContainer';
import {card,addingPage,pages} from './stores/pages/FlowPageStore';
import {modes, addingModes, sets_modes} from './stores/user_modes/UserModesReducers';
import {pagesStore} from './stores/pages/OldFlowPageStore';
import {addingPageContent,pageContents} from './stores/page/FlowPageContentStore';
import {dialogReducer} from 'redux-dialog';
import {userReducer} from './stores/userReducer';
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
import {initiateStore} from './session_storage';
import {persistStore, getStoredState,createPersistor, autoRehydrate} from 'redux-persist'
import * as io from 'socket.io-client';
/*
var socket = io('ws://localhost:7777/websocket');
socket.on('connect', function(){console.log("Connected.");});
socket.on('event', function(data){console.log("New data " + data);});
socket.on('disconnect', function(){console.log('Closed');});
*/

const loggerMiddleware = createLogger();
const routingMiddleware = routerMiddleware(browserHistory)
const initialState:Object = {
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
  modes, addingModes,sets_modes,
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

const render = () => {
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
}

initiateStore(store, render);