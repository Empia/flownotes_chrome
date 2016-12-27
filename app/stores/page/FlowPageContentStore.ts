import {createStore,
  applyMiddleware,
  combineReducers,
  compose,
Middleware,} from 'redux';
import {dispatcher, IDispatchPayload} from '../../dispatcher';
import {Actions} from '../../actions/BaseActions';
import {restHelper} from  '../../helpers/RestHelper';
import {
  REQUEST_PAGE_CONTENT,
  RECEIVE_PAGE_CONTENT,
  REQUEST_REMOVING_PAGE_CONTENT,
  RECIEVE_REMOVING_PAGE_CONTENT,
  SELECT_PAGE
} from './PageActions'



export interface ILabels {
value: string;
name: string;
}

interface PageContent{
  title:string;
  content_type: string;
  content_value: string;
  inPageId?:string;
  inContent?:string;
  labels:Array<ILabels>;
  _id?:string;
}


export const addingPageContent = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_PAGE_CONTENT': return state ? false : true;
//    case 'HIDE_ADD_CARD': return false;
    default: return !!state;
  }
};

const pageContentsInitialState = {
  isPageContentsFetching: false,
  page_content: []
}

export const pageContents = (state = pageContentsInitialState, action) => {
  switch (action.type) {
    case REQUEST_PAGE_CONTENT:
      return (<any>Object).assign({}, state, {
        isPageContentsFetching: true,
      });
    case RECEIVE_PAGE_CONTENT:
      return (<any>Object).assign({}, state, {
        isPageContentsFetching: false,
        page_content: action.page_content,
        lastUpdated: action.receivedAt
      });    
    case 'ADD_PAGE_CONTENT':
      console.log('addPageContent', action.data);
      let newPage = (<any>Object).assign({}, action.data.content, {_id: action.data._id});
      let result = state.page_content.concat([newPage]);
      return (<any>Object).assign({}, state, {
        isPageContentsFetching: false,
        page_content: result,
        lastUpdated: action.recievedAt
      });
    case 'REQUEST_ADDING_PAGE_CONTENT':
      return state;
    case REQUEST_REMOVING_PAGE_CONTENT:
      return (<any>Object).assign({}, state, {
        isPageContentsFetching: true,
      });

    case RECIEVE_REMOVING_PAGE_CONTENT:
      return (<any>Object).assign({}, state, {
          isPageContentsFetching: false,
          page_content: state.page_content.filter(el => el._id !== action.pageContentId),
          lastUpdated: action.receivedAt
        })

    default:
        return state || {isPageContentsFetching: false, page_content: []};
    
  }
};
