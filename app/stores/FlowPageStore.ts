import {createStore,
  applyMiddleware,
  combineReducers,
  compose,
Middleware,} from 'redux';

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

export const pages = (state, action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      let newPage = (<any>Object).assign({}, action.data, {
        score: 1,
        title: action.data,
        id: +new Date
      });
      return state.concat([newPage]);
    default:
        return state || [];
    
  }
};