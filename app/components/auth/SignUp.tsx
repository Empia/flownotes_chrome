import * as React from 'react';
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import Header from '../commons/Header';

import {signinStart, logout} from '../../stores/userActions';
//import SignUpForm from './SignUpForm';
let SignUpForm = require('./SignUpForm.jsx');

function select(state, ownProps) {
  const isAuthenticated = state.user.name || false
  const redirect = ownProps.location.query.redirect || '/'
  return {
    isAuthenticated,
    redirect
  }
}

interface SignUpProps extends React.Props<any>{
}

interface StateProps {
    isAuthenticated: any;
    redirect?:any;
}
interface DispatchProps {
    signinStart: any;
    logout: any;
    replace: any;
}
type SignUpGeneralProps = SignUpProps & StateProps & DispatchProps;

class SignUp extends React.Component<SignUpGeneralProps, {}>{
  refs: {
    [key: string]: (Element);
    name: (HTMLInputElement);
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

  onClick = (e) => {
    e.preventDefault()
    this.props.signinStart({
      name: this.refs.name.value,
      isAdmin: this.refs.admin.checked
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
            <h2>Sign Up</h2>
            <SignUpForm.default />
            <input type="text" ref="name" />
            <br/>
            {/* 'Admin?'
            <input type="checkbox" ref="admin" />
            <br/>
            */}
            <button onClick={this.onClick}>signinStart</button>
          </div>
        </div>        
      </div>
    )
  }

}



export default connect<StateProps,DispatchProps,SignUpProps>(select, { signinStart, logout, replace: routerActions.replace })(SignUp);
