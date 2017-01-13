import * as constants from './userReducer'


export function startLogin(data) {
  return function (dispatch) {
    dispatch(() => {return {type: constants.USER_LOGGING_IN} })
    return fetch(`/api/token`, {method: 'post',
      headers: {'Content-Type': 'application/json'},  body: JSON.stringify({email: data.email, password: data.password})})
      .then(response => response.json())
      .then(json => dispatch(login(json)))      
  }
}

export function login(data) {
  let username = data.username || data.email
  return {
    type: constants.USER_LOGGED_IN,
    payload: Object.assign(data, {username: username})
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

export function signin(data) {
  return {
    type: constants.USER_SIGNED_IN,
    payload: data    
  }
}