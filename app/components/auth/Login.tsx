import * as React from 'react';
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import Header from '../commons/Header';

import {login, logout} from '../../stores/userActions';

function select(state, ownProps) {
  const isAuthenticated = state.user.name || false
  const redirect = ownProps.location.query.redirect || '/'
  return {
    isAuthenticated,
    redirect
  }
}

interface AuthProps extends React.Props<any>{
}

interface StateProps {
    isAuthenticated: any;
    redirect?:any;
}
interface DispatchProps {
    login: any;
    logout: any;
    replace: any;
}
type AuthGeneralProps = AuthProps & StateProps & DispatchProps;

class Auth extends React.Component<AuthGeneralProps, {}>{
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
    this.props.login({
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
            <h2>Enter your name</h2>
            <input type="text" ref="name" />
            <br/>
            {'Admin?'}
            <input type="checkbox" ref="admin" />
            <br/>
            <button onClick={this.onClick}>Login</button>
          </div>
        </div>        
      </div>
    )
  }

}



export default connect<StateProps,DispatchProps,AuthProps>(select, { login, logout, replace: routerActions.replace })(Auth);
