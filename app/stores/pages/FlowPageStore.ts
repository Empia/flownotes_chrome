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


class PagesStore{
  
  private APIBASE:string = 'api/pages/';
  
  private items:Array<Page> = [];
  private listeners:Array<Function> = [];
  private dispatcherId:string;
  
  constructor(){
    this.dispatcherId = dispatcher.register(this.handleDispatch.bind(this));
    this.initialize();
  }
  
  getItems(){
    return this.items;
  }
  
  onChange(listener){
    this.listeners.push(listener);
  }
  
  private initialize(){
    restHelper.get(this.APIBASE).then((data:Page[])=> {
      this.items = data;
      this.triggerListeners();
    });
  }
  
  private addItem(item:Page){
    restHelper.post(this.APIBASE, item).then(id=> item._id = id );
    this.items.push(item);
    this.triggerListeners();
  }
  
  private triggerListeners(){
    for(let listener of this.listeners){
      listener(this.items);
    }
  }
  private deleteItem(item:Page){
    let matchIdx = this._getItemIndex(item);
    
    if(~matchIdx){
      this.items.splice(matchIdx, 1);
    }
    
    this.triggerListeners();
    restHelper.del(this.APIBASE + item._id);
  }
  
  private _getItemIndex(item:Page){
    return this.items.indexOf(item);
  }
  
  private handleDispatch(event:IDispatchPayload<Page>){
    let parts = event.type.split(':'),
        mainKey = parts[0], 
      action = +parts[1];
      
    if(mainKey === 'grocery-item'){
      switch(action){
        case Actions.add:
          this.addItem(event.payload);
        break;
        
        case Actions.delete:
          this.deleteItem(event.payload);
          break;
      }
    }
  }
}

export const pagesStore:PagesStore = new PagesStore;




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


export const pages = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_PAGES:
      return (<any>Object).assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_PAGES:
      return (<any>Object).assign({}, state, {
        isFetching: false,
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

    default:
        return state || {isFetching: false, items: []};
    
  }
};