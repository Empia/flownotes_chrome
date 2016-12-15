
export const toggleAddPage= () => ({type: 'TOGGLE_ADD_CARD'});
export const hideAddPage= () => ({type: 'HIDE_ADD_CARD'});
export const REQUEST_PAGES = 'REQUEST_PAGES'
export const RECEIVE_PAGES = 'RECEIVE_PAGES'
export const REQUEST_REMOVING_PAGE = 'REQUEST_REMOVING_PAGE'
export const RECIEVE_REMOVING_PAGE = 'RECIEVE_REMOVING_PAGE'

export const requestPages = () => {
  return {
    type: REQUEST_PAGES
  }
}

export const receivePages = (json) => {
  console.log('json', json);
  return {
    type: RECEIVE_PAGES,
    pages: json,//.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
export function fetchPages() {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestPages())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`/api/pages/`)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receivePages(json))
      )

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}


export function requestRemovingPage(pageId) {
  return {
    type: REQUEST_REMOVING_PAGE
  }
}
export function receiveDeletedPage(pageId) {
  return {
    type: RECIEVE_REMOVING_PAGE,
    pageId: pageId,
    recievedAt: Date.now()
  }
}

export function addedPage(page) { return {type: 'ADD_PAGE', data: page} };
export function addPage(page) {
  return function (dispatch) {
    dispatch(function(){ return { type: 'REQUEST_ADDING_PAGE' } });
    return fetch(`/api/pages/`, {method: 'post',
      headers: {'Content-Type': 'application/json'},  body: JSON.stringify({title: page.title, name: page.title})})
      .then(response => response.json())
      .then(json => dispatch(addedPage({_id: json, title: page.title})))
  }
}
export function removePage(pageId) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestRemovingPage(pageId))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`/api/pages/${pageId}`, {method: 'delete'})
      .then(response => { 
          dispatch(receiveDeletedPage(pageId));
      })
      // In a real world app, you also want to
      // catch any error in the network call.
  }
}