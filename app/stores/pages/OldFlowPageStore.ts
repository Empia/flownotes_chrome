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