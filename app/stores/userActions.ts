import * as constants from './userReducer'


interface LoginData{
  email:string;
  password:string;
}
interface UserData {
  email:string;
  token:string;
  username:string;
}

export function startLogin(data: LoginData) {
  return function (dispatch) {
    dispatch(() => {return {type: constants.USER_LOGGING_IN} })
    return fetch(`/api/token`, {method: 'post',
      headers: {'Content-Type': 'application/json'},  body: JSON.stringify({email: data.email, password: data.password})})
      .then(response => response.json())
      .then(json => dispatch(login(json)))      
  }
}

export function restoreUser(data:UserData) {
  return {
    type: constants.RESTORE_USER,
    payload: data
  }
}

export function login(data) {
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

export function logout() {
  return {
    type: constants.USER_LOGGED_OUT
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