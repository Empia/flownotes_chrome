import {getJWT} from '../jwt';

export const toggleAddPageContent= () => ({type: 'TOGGLE_ADD_PAGE_CONTENT'});
export const REQUEST_PAGE_CONTENT = 'REQUEST_PAGE_CONTENT'
export const RECEIVE_PAGE_CONTENT = 'RECEIVE_PAGE_CONTENT'
export const SELECT_PAGE = 'SELECT_PAGE'

export const REQUEST_REMOVING_PAGE_CONTENT = 'REQUEST_REMOVING_PAGE_CONTENT'
export const RECIEVE_REMOVING_PAGE_CONTENT = 'RECIEVE_REMOVING_PAGE_CONTENT'

//
export const RECIEVE_UPDATING_PAGE_CONTENT = 'RECIEVE_UPDATING_PAGE_CONTENT'
export const REQUEST_UPDATING_PAGE_CONTENT = 'REQUEST_UPDATING_PAGE_CONTENT'
export const REQUEST_MOVING_ORDER_PAGE_CONTENT = 'REQUEST_MOVING_ORDER_PAGE_CONTENT'
export const RECIEVE_ORDERED_PAGE_CONTENT = 'RECIEVE_ORDERED_PAGE_CONTENT'
export const RECEIVE_PAGE_CONTENT_ORDERING = 'RECEIVE_PAGE_CONTENT_ORDERING'

export const selectPage = (pageId) => {
console.log('selectPage');
 return {
    type: SELECT_PAGE,
    selectedPageId: pageId
  }
}


export const editPageContentsToggles = (pageContentId) => {
console.log('selectPage');
 return {
    type: 'TOGGLE_EDIT_PAGE_CONTENT',
    editPageContentId: pageContentId
  }
}

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

export const recievePageOrdering = (updatedOrdering) => {
  return {
    type: RECEIVE_PAGE_CONTENT_ORDERING,
    page_content: updatedOrdering
  }
}

export function fetchPageContent(pageId) {
  return function (dispatch) {
    dispatch(requestPageContent(pageId))
    return fetch(`/api/content/page/${pageId}`, {headers: {'Authorization': getJWT()} })
      .then(response => response.json())
      .then(json =>
        dispatch(receivePageContent(json))
      )
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
export function sortBy(param) { 
  if (param === 'order_asc') {
    return {
      type: 'SORT_BY_ORDER_ASC'
    }
  }
  if (param === 'order_desc') {
    return {
      type: 'SORT_BY_ORDER_DESC'
    }
  }
  if (param === 'date_asc') {
    return {
      type: 'SORT_BY_DATE_ASC'
    }
  } else {
    return {
      type: 'SORT_BY_DATE_DESC'
    }
  }
}

export function addPageContent(pageId, content) {
  return function (dispatch) {
    dispatch(function(){ return { type: 'REQUEST_ADDING_PAGE' } });
    let contentToAdd = {
        title: content.title, 
        content_type: content.content_type,
        content_value: content.content_value,
        inPageId: content.inPageId,
        inContent: content.inContent,
    }
    return fetch(`/api/content/page/${pageId}`, {method: 'post',
      headers: {'Content-Type': 'application/json', 'Authorization': getJWT() },  body: JSON.stringify(contentToAdd)})
      .then(response => response.json())
      .then(json => { 
        let response:any = json;
        dispatch(addedPageContent({_id: response._id, content: response }))
      })
  }
}

export function requestMovingOrderPageContent(pageId, pageContentId) {
  return {
    type: REQUEST_MOVING_ORDER_PAGE_CONTENT
  }  
}
export function moveOrderPageContent(pageId, pageContentId, content) {
  return function (dispatch) {
    dispatch(requestMovingOrderPageContent(pageId, pageContentId))
    return fetch(`/api/content/order/${pageContentId}`, { method: 'patch', headers: {'Authorization': getJWT()} })
      .then(response => { 
          console.log(response);
          dispatch(receiveOrderedPageContent(pageId, pageContentId));
      })
  }
}
export function receiveOrderedPageContent(pageId, pageContentId) {
  return {
    type: RECIEVE_ORDERED_PAGE_CONTENT,
    pageId: pageId,
    pageContentId: pageContentId,
    recievedAt: Date.now()
  }
}


export function requestUpdatingPageContent(pageId, pageContentId) {
  return {
    type: REQUEST_UPDATING_PAGE_CONTENT
  }  
}
export function updatePageContent(pageId, pageContentId, content) {
  return function (dispatch) {
    let contentToUpdate = {
        title: content.title, 
        content_value: content.content_value
    }    
    console.log('updatePageContent', JSON.stringify(contentToUpdate));
    dispatch(requestUpdatingPageContent(pageId, pageContentId))
    return fetch(`/api/content/update/${pageContentId}`, {method: 'post', headers: {'Content-Type': 'application/json',
                                                                                    'Authorization': getJWT()}, 
      body: JSON.stringify(contentToUpdate)
    }).then(response => { 
          console.log(response);
          dispatch(receiveUpdatePageContent(pageId, pageContentId));
      })
  }
}
export function receiveUpdatePageContent(pageId, pageContentId) {
  return {
    type: RECIEVE_UPDATING_PAGE_CONTENT,
    pageId: pageId,
    pageContentId: pageContentId,
    recievedAt: Date.now()
  }
}

export function removePageContent(pageId, pageContentId) {
  return function (dispatch) {
    dispatch(requestRemovingPageContent(pageId, pageContentId))
    return fetch(`/api/content/${pageContentId}`, {method: 'delete', headers: {'Authorization': getJWT()} })
      .then(response => { 
          console.log(response);
          dispatch(receiveDeletedPageContent(pageId, pageContentId));
      })
  }
}
