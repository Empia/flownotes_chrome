import * as constants from './userReducer'

export function login(data) {
  return {
    type: constants.USER_LOGGED_IN,
    payload: data
  }
}

export function logout() {
  return {
    type: constants.USER_LOGGED_OUT
  }
}