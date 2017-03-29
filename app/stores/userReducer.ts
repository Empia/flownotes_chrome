export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const CANT_LOGGED_IN = 'CANT_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_LOGGING_IN = 'USER_LOGGING_IN';
export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_SIGNING_IN = 'USER_SIGNING_IN';
export const RESTORE_USER = 'RESTORE_USER';

const initialState = {
  data: null,
  isLoading: false
}

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESTORE_USER:
      return { ...initialState, data: payload }
    case USER_LOGGING_IN:
      return { ...initialState, isLoading: true }
    case USER_LOGGED_IN:
      return { data: payload, isLoading: false }
    case USER_LOGGED_OUT:
      return initialState
    case USER_SIGNING_IN:
      return { ...initialState, isLoading: true }       
    case USER_SIGNED_IN:
      return { data: payload, isLoading: false }     
    default:
      return state
  }
}