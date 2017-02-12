"use strict";
const redux_auth_wrapper_1 = require("redux-auth-wrapper");
const react_router_redux_1 = require("react-router-redux");
export const UserIsAuthenticated = redux_auth_wrapper_1.UserAuthWrapper({
    authSelector: state => state.user,
    redirectAction: react_router_redux_1.routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated'
});
export const UserIsAdmin = redux_auth_wrapper_1.UserAuthWrapper({
    authSelector: state => state.user,
    redirectAction: react_router_redux_1.routerActions.replace,
    failureRedirectPath: '/',
    wrapperDisplayName: 'UserIsAdmin',
    predicate: user => user.isAdmin,
    allowRedirectBack: false
});
export const VisibleOnlyAdmin = redux_auth_wrapper_1.UserAuthWrapper({
    authSelector: state => state.user,
    wrapperDisplayName: 'VisibleOnlyAdmin',
    predicate: user => user.isAdmin,
    FailureComponent: null
});
