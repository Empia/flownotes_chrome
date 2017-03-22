import {persistStore, getStoredState,createPersistor, autoRehydrate} from 'redux-persist'
import {restoreUser} from './stores/userActions';
import {fetchPages} from './stores/pages/PagesActions';

const persistConfig:Object = { /* ... */ }
var firstLoad:boolean = false 

const initiateStore = (store:Redux.Store<{}>, render:() => void) => {

persistStore(store);
getStoredState(persistConfig, (err, restoredState:any):void => {
    // restore user
  console.log('restoredState',restoredState)
  store.dispatch(restoreUser(restoredState.user.data));
  store.dispatch(fetchPages()).then(() =>
     console.log('store.getState ',store.getState())
  )
})


render();
store.subscribe(() => {
  firstLoad = firstLoad || true;
  if (!firstLoad){
    getStoredState(persistConfig, (err, restoredState:any) => {
      // restore user
    console.log('restoredState',restoredState)
    store.dispatch(restoreUser(restoredState.user.data));
    store.dispatch(fetchPages()).then(() =>
       console.log('store.getState ',store.getState())
    )
    })
  }
  //console.log('user', store.getState().user);
  render() 
});


}
export {firstLoad, initiateStore}