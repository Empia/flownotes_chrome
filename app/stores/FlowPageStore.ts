import {createStore,
  applyMiddleware,
  combineReducers,
  compose,
Middleware,} from 'redux';

const pages = (state, action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      let newPage = (<any>Object).assign({}, action.data, {
        score: 1,
        id: +new Date
      });
      return state.concat([newPage]);
    default:
        return state || [];
    
  }
};

let FlowPageStore = createStore(combineReducers({
  pages
}))

export {FlowPageStore};