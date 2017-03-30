import * as constants from './userReducer'
import {fetchPages} from './pages/PagesActions';
import {getJWT} from './jwt';

interface LoginData{
  email:string;
  password:string;
}
interface UserData {
  email:string;
  token:string;
  username:string;
}

export function userAppInit() {
  return 
}

export function startLogin(data: LoginData) {
  return function (dispatch) {
    dispatch(() => {return {type: constants.USER_LOGGING_IN} })
    return fetch(`/api/token`, {method: 'post',
      headers: {'Content-Type': 'application/json'},  body: JSON.stringify({email: data.email, password: data.password})})
      .then(response => response.json())
      .then(json => {
        let rr = new Promise(function(resolve, reject) {
          resolve(dispatch(login(json)))
        });               
        rr.then((r:any) => { 
          localStorage.setItem('reduxPersist:user', JSON.stringify({ data: r.payload, isLoading: false }))      
          console.log('preformed', getJWT());
          dispatch(fetchPages())
      })
      })      
  }
}

export function restoreUser(data:UserData) {
  return {
    type: constants.RESTORE_USER,
    payload: data
  }
}

export function login(data):any {
  if (data.status && data.status == 'unauthorized') {
    return {
      type: constants.CANT_LOGGED_IN
    }
  } else {
    let username = data.username || data.email
    return {
      type: constants.USER_LOGGED_IN,
      payload: <UserData>Object.assign(data, {username: username})
    }
  }
}

export function logoutRoutine(dispatch) {
  dispatch(fetchPages())
  dispatch({ type: constants.USER_LOGGED_OUT })
}

export function logout() {
  return function (dispatch) {
    localStorage.removeItem('reduxPersist:user')  
    return logoutRoutine(dispatch)
}
}


export function signinStart(data) {
  return function (dispatch) {
    dispatch(() => {return {type: constants.USER_SIGNING_IN} })
    return fetch(`/api/signUp/`, {method: 'post',
      headers: {'Content-Type': 'application/json'},  body: JSON.stringify({email: data.email, password: data.password})})
      .then(response => response.json())
      .then(json => dispatch(signin(json)))   
  }
}

export function signin(data:Response) {
  return {
    type: constants.USER_SIGNED_IN,
    payload: data    
  }
}