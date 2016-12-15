
export const toggleAddPageContent= () => ({type: 'TOGGLE_ADD_PAGE_CONTENT'});
export const REQUEST_PAGE_CONTENT = 'REQUEST_PAGE_CONTENT'
export const RECEIVE_PAGE_CONTENT = 'RECEIVE_PAGE_CONTENT'
export const REQUEST_REMOVING_PAGE_CONTENT = 'REQUEST_REMOVING_PAGE_CONTENT'
export const RECIEVE_REMOVING_PAGE_CONTENT = 'RECIEVE_REMOVING_PAGE_CONTENT'

export const requestPageContent = (pageId) => {
  return {
    type: REQUEST_PAGE_CONTENT
  }
}

export const receivePageContent = (json) => {
  console.log('json', json);
  return {
    type: RECEIVE_PAGE_CONTENT,
    page_content: json,//.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
export function fetchPageContent(pageId) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestPageContent(pageId))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`/api/content/page/${pageId}`)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receivePageContent(json))
      )

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}


export function requestRemovingPageContent(pageId, pageContentId) {
  return {
    type: REQUEST_REMOVING_PAGE_CONTENT
  }
}
export function receiveDeletedPageContent(pageId, pageContentId) {
  return {
    type: RECIEVE_REMOVING_PAGE_CONTENT,
    pageId: pageId,
    pageContentId: pageContentId,
    recievedAt: Date.now()
  }
}

export function addedPageContent(content) { return {type: 'ADD_PAGE_CONTENT', data: content} };
export function addPageContent(pageId, content) {
  return function (dispatch) {
    dispatch(function(){ return { type: 'REQUEST_ADDING_PAGE' } });
    return fetch(`/api/content/page/${pageId}`, {method: 'post',
      headers: {'Content-Type': 'application/json'},  body: JSON.stringify({title: content.title, name: content.title})})
      .then(response => response.json())
      .then(json => dispatch(addedPageContent({_id: json, title: content.title})))
  }
}
export function removePageContent(pageId, pageContentId) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestRemovingPageContent(pageId, pageContentId))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`/api/content/${pageContentId}`, {method: 'delete'})
      .then(response => { 
          console.log(response);
          dispatch(receiveDeletedPageContent(pageId, pageContentId));
      })
      // In a real world app, you also want to
      // catch any error in the network call.
  }
}
