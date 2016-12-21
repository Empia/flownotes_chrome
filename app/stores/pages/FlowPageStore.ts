import {createStore,
  applyMiddleware,
  combineReducers,
  compose,
Middleware,} from 'redux';
import {dispatcher, IDispatchPayload} from '../../dispatcher';
import {Actions} from '../../actions/BaseActions';
import {restHelper} from  '../../helpers/RestHelper';

import {
  REQUEST_PAGES, RECEIVE_PAGES,REQUEST_REMOVING_PAGE,RECIEVE_REMOVING_PAGE
} from './PagesActions'

interface Page{
  name:string;
  _id?:any;
}

export const card = (state,action) => {
  switch (action.type) {
    case 'ADD_CARD':
      let newCard = { name: action.data, id: +new Date};
      return state.concat([newCard]);
    default:
      return state || [];  
    }
}
export const addingPage = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_CARD': return state ? false : true;
    case 'HIDE_ADD_CARD': return false;
    default: return !!state;
  }
};



/*
function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}
*/

const pagesInitialState = {
  isFetching: false,
  isFetched: false,
  items: [],
  selectedPage: undefined
}

export const pages = (state = pagesInitialState, action) => {
  switch (action.type) {
    case REQUEST_PAGES:
      return (<any>Object).assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_PAGES:
      return (<any>Object).assign({}, state, {
        isFetching: false,
        isFetched: true,
        items: action.pages,
        lastUpdated: action.receivedAt
      });    
    case 'ADD_PAGE':
      let newPage = (<any>Object).assign({}, action.data);
      let result = state.items.concat([newPage]);
      return (<any>Object).assign({}, state, {
        isFetching: false,
        items: result,
        lastUpdated: action.recievedAt
      });
    case 'REQUEST_ADDING_PAGE':
      return state;
    case 'REQUEST_UPDATE_PAGE':
      return state;
    case 'UPDATE_PAGE':
      let pageToUpdate = (<any>Object).assign({}, action.data);
      let resultToUpdate = state.items.filter(el => el._id !== action.pageId).concat([pageToUpdate]);
      return (<any>Object).assign({}, state, {
        isFetching: false,
        items: resultToUpdate,
        lastUpdated: action.recievedAt
      });

    case REQUEST_REMOVING_PAGE:
      return (<any>Object).assign({}, state, {
        isFetching: true,
      });

    case RECIEVE_REMOVING_PAGE:
      return (<any>Object).assign({}, state, {
          isFetching: false,
          items: state.items.filter(el => el._id !== action.pageId),
          lastUpdated: action.receivedAt
        })

    case 'SELECT_PAGE':
      console.log('select_page action', state, action)
      return (<any>Object).assign({}, state, {
        selectedPage: state.items.find(el => el._id === action.selectedPageId),
      });

    default:
        return state || {isFetching: false, items: []};
    
  }
};