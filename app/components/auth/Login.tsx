import * as React from 'react';
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import Header from '../commons/Header';

import {startLogin, logout} from '../../stores/userActions';
//import LoginForm from './LoginForm';
let LoginForm = require('./LoginForm.jsx');

function select(state, ownProps) {
  const isAuthenticated = state.user.name || false
  const loginForm = state.form.login_form || {}
  const redirect = ownProps.location.query.redirect || '/'
  return {
    isAuthenticated,
    redirect,
    loginForm
  }
}

interface AuthProps extends React.Props<any>{
}

interface StateProps {
    isAuthenticated: any;
    redirect?:any;
    loginForm:any;
}
interface DispatchProps {
    startLogin: any;
    logout: any;
    replace: any;
}
type AuthGeneralProps = AuthProps & StateProps & DispatchProps;

class Auth extends React.Component<AuthGeneralProps, {}>{
  refs: {
    [key: string]: (Element);
    username: (HTMLInputElement);
    password: (HTMLInputElement);
    email: (HTMLInputElement);
    admin: (HTMLInputElement);
  }

 componentWillMount() {
    const { isAuthenticated, replace, redirect } = this.props
    if (isAuthenticated) {
      replace(redirect)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, replace, redirect } = nextProps
    const { isAuthenticated: wasAuthenticated } = this.props

    if (!wasAuthenticated && isAuthenticated) {
      replace(redirect)
    }
  }

  handleLogin = (values) => {
    values.preventDefault();
    console.log(values, this.props.loginForm);
    this.props.startLogin({
      email: this.props.loginForm.values.email,
      password: this.props.loginForm.values.password,
    })    
  }
  onClick = (e) => {
    e.preventDefault()
    console.log('handle submit', e);   
    this.props.startLogin({
      email: this.refs.email.value,
      password: this.refs.password.value,
    })
  };
  onClick2 = (e) => {
    e.preventDefault()
    this.props.logout();
  };


  render() {
    return (
      <div>
        <div className="focusedPageContainer">
          <div>
            <h2>Sign In</h2>
            <LoginForm.default 
              initialValues={{email: '', password: ''}} 
              form={'login_form'}
              handleSubmit={this.handleLogin} />
            {/*<input type="text" ref="email" />
            <input type="text" ref="password" />

            <br/>
            {'Admin?'}
            <input type="checkbox" ref="admin" />
            <br/>
            <button onClick={this.onClick}>Login</button>
            */}
          </div>
        </div>        
      </div>
    )
  }

}



export default connect<StateProps,DispatchProps,AuthProps>(select, { startLogin, logout, replace: routerActions.replace })(Auth);
