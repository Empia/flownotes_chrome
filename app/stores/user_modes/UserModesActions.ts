export const toggleAddMode= () => ({type: 'TOGGLE_ADD_MODE'});
export const hideAddMode= () => ({type: 'HIDE_ADD_MODE'});
export const REQUEST_MODES = 'REQUEST_MODES'
export const RECEIVE_MODES = 'RECEIVE_MODES'
export const REQUEST_REMOVING_MODE = 'REQUEST_REMOVING_MODE'
export const RECIEVE_REMOVING_MODE = 'RECIEVE_REMOVING_MODE'
export const requestModes = () => {
  return {
    type: REQUEST_MODES
  }
}
export const receiveModes = (json) => {
  console.log('json', json);
  return {
    type: RECEIVE_MODES,
    modes: json,//.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
export function fetchModes() {
  return function (dispatch) {
    dispatch(requestModes())
    return fetch(`/api/pages/`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveModes(json))
      )
  }
}
export function requestRemovingMode(modeId) {
  return {
    type: REQUEST_REMOVING_MODE
  }
}
export function receiveDeletedMode(modeId) {
  return {
    type: RECIEVE_REMOVING_MODE,
    modeId: modeId,
    recievedAt: Date.now()
  }
}
export function addedMode(mode) { return {type: 'ADD_MODE', data: mode} };
export function addMode(mode) {
  return function (dispatch) {
    dispatch(function(){ return { type: 'REQUEST_ADDING_MODE' } });
    return fetch(`/api/pages/`, {method: 'post',
      headers: {'Content-Type': 'application/json'},  body: JSON.stringify({title: mode.title, name: mode.title})})
      .then(response => response.json())
      .then(json => dispatch(addedMode({_id: json, title: mode.title})))
  }
}
export function updateMode(modeId, mode) {
  return function (dispatch) {
    dispatch(function(){ return { type: 'REQUEST_UPDATE_MODE' } });
    return fetch(`/api/pages/${modeId}`, {method: 'PATCH',
      headers: {'Content-Type': 'application/json'},  body: JSON.stringify({_id: modeId, title: mode.title})})
      .then(response => response.json())
      .then(json => dispatch(updatedMode(modeId, {_id: modeId, title: mode.title})))
  }
}
export function updatedMode(modeId, mode) { return {type: 'UPDATE_MODE', data: mode, modeId: modeId} };

export function removeMode(modeId) {
  return function (dispatch) {
    dispatch(requestRemovingMode(modeId))
    return fetch(`/api/pages/${modeId}`, {method: 'delete'})
      .then(response => { 
          dispatch(receiveDeletedMode(modeId));
      })
  }
}