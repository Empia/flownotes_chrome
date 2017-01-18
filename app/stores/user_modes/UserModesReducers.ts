import {createStore,applyMiddleware,combineReducers,compose,Middleware,} from 'redux';
import {dispatcher, IDispatchPayload} from '../../dispatcher';
import {Actions} from '../../actions/BaseActions';
import {restHelper} from  '../../helpers/RestHelper';
import {REQUEST_ADDING_MODE,REQUEST_ADD_SET_MODE,SET_MODE_UPDATED,REQUEST_REMOVING_SET_MODE,RECIEVE_REMOVING_SET_MODE,
REQUEST_UPDATE_MODE,UPDATE_MODE,REQUEST_SETS_MODES,REQUEST_SET_MODE,SET_MODE_REQUESTED,RECEIVE_SETS_MODES,
  REQUEST_MODES, ADD_MODE,TOGGLE_ADD_MODE,HIDE_ADD_MODE, RECEIVE_MODES,REQUEST_REMOVING_MODE,RECIEVE_REMOVING_MODE
} from './UserModesActions'

interface UserMode{
  name:string;
  _id?:any;
}


export const addingModes = (state, action) => {
  switch (action.type) {
    case TOGGLE_ADD_MODE: return state ? false : true;
    case HIDE_ADD_MODE: return false;
    default: return !!state;
  }
};

const modesInitialState = {
  isFetching: false,
  isFetched: false,
  items: [],
}

export const modes = (state = modesInitialState, action) => {
  switch (action.type) {
    case REQUEST_MODES:
      return (<any>Object).assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_MODES:
      return (<any>Object).assign({}, state, {
        isFetching: false,
        isFetched: true,
        items: action.modes,
        lastUpdated: action.receivedAt
      });    
    case ADD_MODE:
      let newMode = (<any>Object).assign({}, action.data);
      let result = state.items.concat([newMode]);
      return (<any>Object).assign({}, state, {
        isFetching: false,
        items: result,
        lastUpdated: action.recievedAt
      });
    case REQUEST_ADDING_MODE:
      return state;
    case REQUEST_UPDATE_MODE:
      return state;
    case UPDATE_MODE:
      let modeToUpdate = (<any>Object).assign({}, action.data);
      let resultToUpdate = state.items.filter(el => el._id !== action.modeId).concat([modeToUpdate]);
      return (<any>Object).assign({}, state, {
        isFetching: false,
        items: resultToUpdate,
        lastUpdated: action.recievedAt
      });

    case REQUEST_REMOVING_MODE:
      return (<any>Object).assign({}, state, {
        isFetching: true,
      });

    case RECIEVE_REMOVING_MODE:
      return (<any>Object).assign({}, state, {
          isFetching: false,
          items: state.items.filter(el => el._id !== action.modeId),
          lastUpdated: action.receivedAt
        })
    default:
        return state || {isFetching: false, items: []};
    
  }
};


const sets_modesInitialState = {
  isFetching: false,
  isFetched: false,
  items: [],
}

export const sets_modes = (state = sets_modesInitialState, action) => {
  switch (action.type) {
    case REQUEST_SET_MODE:
      return state
    case RECEIVE_SETS_MODES:
      return (<any>Object).assign({}, state, {
          isFetching: false,
          items: state.items,
          lastUpdated: action.receivedAt
        })  
    case SET_MODE_REQUESTED:
      return (<any>Object).assign({}, state, {
        isFetching: true,
      })
    case REQUEST_ADD_SET_MODE: 
      return state
    case SET_MODE_UPDATED: 
      let newMode = (<any>Object).assign({}, action.data);
      let result = state.items.concat([newMode]);
      return (<any>Object).assign({}, state, {
        isFetching: false,
        items: result,
        lastUpdated: action.recievedAt
      })

    case REQUEST_REMOVING_SET_MODE:
      return (<any>Object).assign({}, state, {
        isFetching: true,
      })    
    case RECIEVE_REMOVING_SET_MODE:
      return (<any>Object).assign({}, state, {
          isFetching: false,
          items: state.items.filter(el => el._id !== action.modeId),
          lastUpdated: action.receivedAt
      })          
    default:
        return state || {isFetching: false, items: []};      
  }    
}