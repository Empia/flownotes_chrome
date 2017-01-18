export const toggleAddMode= () => ({type: 'TOGGLE_ADD_MODE'});
export const hideAddMode= () => ({type: 'HIDE_ADD_MODE'});
export const REQUEST_MODES = 'REQUEST_MODES'
export const RECEIVE_MODES = 'RECEIVE_MODES'
export const REQUEST_REMOVING_MODE = 'REQUEST_REMOVING_MODE'
export const RECIEVE_REMOVING_MODE = 'RECIEVE_REMOVING_MODE'
export const ADD_MODE = 'ADD_MODE';
export const TOGGLE_ADD_MODE = 'TOGGLE_ADD_MODE';
export const HIDE_ADD_MODE = 'HIDE_ADD_MODE';
export const REQUEST_ADDING_MODE = 'REQUEST_ADDING_MODE';
export const UPDATE_MODE = 'UPDATE_MODE';
export const REQUEST_UPDATE_MODE = 'REQUEST_UPDATE_MODE';
export const REQUEST_SETS_MODES = 'REQUEST_SETS_MODES';
export const RECEIVE_SETS_MODES = 'RECEIVE_SETS_MODES';
export const REQUEST_SET_MODE = 'REQUEST_SET_MODE';
export const SET_MODE_REQUESTED = 'SET_MODE_REQUESTED';
export const REQUEST_ADD_SET_MODE = 'REQUEST_ADD_SET_MODE';
export const SET_MODE_UPDATED = 'SET_MODE_UPDATED';

export const REQUEST_REMOVING_SET_MODE = 'REQUEST_REMOVING_SET_MODE';
export const RECIEVE_REMOVING_SET_MODE = 'RECIEVE_REMOVING_SET_MODE';

import {store} from '../../main';
import {getJWT} from '../jwt';

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
    return fetch(`/api/user_modes/`, {headers: {'Authorization': getJWT()} } )
      .then(response => response.json())
      .then(json =>
        dispatch(receiveModes(json))
      )
  }
}

export function addedMode(mode) { return {type: ADD_MODE, data: mode} };
export function addMode(mode) {
  return function (dispatch) {
    dispatch(function(){ return { type: REQUEST_ADDING_MODE } });
    return fetch(`/api/user_modes/`, {method: 'post',
      headers: {'Content-Type': 'application/json', 'Authorization': getJWT()},  body: JSON.stringify({title: mode.title, name: mode.title})})
      .then(response => response.json())
      .then(json => dispatch(addedMode({_id: json, title: mode.title})))
  }
}
export function updateMode(modeId, mode) {
  return function (dispatch) {
    dispatch(function(){ return { type: REQUEST_UPDATE_MODE } });
    return fetch(`/api/user_modes/${modeId}`, {method: 'PATCH',
      headers: {'Content-Type': 'application/json','Authorization': getJWT()},  body: JSON.stringify({_id: modeId, title: mode.title})})
      .then(response => response.json())
      .then(json => dispatch(updatedMode(modeId, {_id: modeId, title: mode.title})))
  }
}
export function updatedMode(modeId, mode) { return {type: UPDATE_MODE, data: mode, modeId: modeId} };

export function removeMode(modeId) {
  return function (dispatch) {
    dispatch(requestRemovingMode(modeId))
    return fetch(`/api/user_modes/${modeId}`, {headers: {'Authorization': getJWT()}, method: 'delete'})
      .then(response => { 
          dispatch(receiveDeletedMode(modeId));
      })
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
//////////////////////////////////////////////////////////////
export const requestSetsModes = () => {
  return {
    type: REQUEST_SETS_MODES
  }
}
export const receiveSetsModes = (json) => {
  console.log('json', json);
  return {
    type: RECEIVE_SETS_MODES,
    modes: json,//.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
export function fetchSetsModes() {
  return function (dispatch) {
    dispatch(requestSetsModes())
    return fetch(`/api/set_modes/`, {method: 'get', headers: {'Authorization': getJWT()} })
      .then(response => response.json())
      .then(json =>
        dispatch(receiveSetsModes(json))
      )
  }
}


export function setMode(modeId, mode) {
  return function (dispatch) {
    dispatch(function(){ return { type: REQUEST_ADD_SET_MODE } });
    return fetch(`/api/set_mode/${modeId}`, {method: 'PATCH',
      headers: {'Content-Type': 'application/json', 'Authorization': getJWT()},  body: JSON.stringify({_id: modeId, title: mode.title})})
      .then(response => response.json())
      .then(json => dispatch(updatedSetMode(modeId, {_id: modeId, title: mode.title})))
  }
}
export function updatedSetMode(modeId, mode) { return {type: SET_MODE_UPDATED, data: mode, modeId: modeId} };


export function requestRemovingSetMode(modeId) {
  return {
    type: REQUEST_REMOVING_SET_MODE
  }
}
export function receiveDeletedModeSet(modeId) {
  return {
    type: RECIEVE_REMOVING_SET_MODE,
    modeId: modeId,
    recievedAt: Date.now()
  }
}
export function removeSetMode(modeId) {
  return function (dispatch) {
    dispatch(requestRemovingSetMode(modeId))
    return fetch(`/api/set_mode/${modeId}`, {headers: {'Authorization': getJWT()}, method: 'delete'})
      .then(response => { 
          dispatch(receiveDeletedModeSet(modeId));
      })
  }
}
