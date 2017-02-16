import * as React from "react";
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router';
import Table from './Table';
import * as styles from './header.css';
import * as CSSModules from 'react-css-modules';
import {login, logout} from '../../stores/userActions';
import { connect } from 'react-redux'


const mapStateToProps = ({user}) => ({
  user
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})
interface HeaderProps extends React.Props<any>{
  user: any;
  logout: any;
}
interface HeaderState{}
class Header extends React.Component<HeaderProps, HeaderState>{

  onSearch() {
    console.log('good');
  }
  onClick2 = (e) => {
    console.log('logout')
    this.props.logout();
    e.preventDefault();
  };
  subpanelStyles = {
    display: 'none'
  };
  aditionalStuff = () => {
    return (<span>
            <li>
              <IndexLink to="/foo" 
              activeClassName={styles.active}  
              activeStyle={{fontWeight: 'bold'}}>Foo</IndexLink>
            </li>
            <li>
            <Link to="/modes" activeClassName={styles.active}   
              activeStyle={{fontWeight: 'bold'}}>Modes</Link>
            </li>
            <li>
              <Link to="/about" activeClassName={styles.active}  
              activeStyle={{fontWeight: 'bold'}}>About</Link>
            </li>
            <li>
              <Link to="/examples" activeClassName={styles.active}  
              activeStyle={{fontWeight: 'bold'}}>Examples</Link>
            </li>
            </span>
    )
  }

  render(){
    return  (
     <div className={styles.top_bar}>
        <div className="top_bar_left">
          <ul className={styles.menu}>
            <li className="menu_text product_logo">
              <IndexLink to="/" 
                activeClassName={styles.active}  
                activeStyle={{fontWeight: 'bold'}}>Flownotes</IndexLink></li>

            { this.props.user.data !== null ?

            <li>
              <IndexLink to="/" 
              activeClassName={styles.active} 
              activeStyle={{fontWeight: 'bold'}}>Pages</IndexLink>
            </li>
            : <li></li>}
              { this.props.user.data === null ?  
               <li>
                <IndexLink to="/login" 
                activeClassName={styles.active}  
                activeStyle={{fontWeight: 'bold'}}>Login</IndexLink>
               </li> : <span></span>
              }    
              { this.props.user.data === null ?                  
              <li>
                <IndexLink to="/signup" 
                activeClassName={styles.active}  
                activeStyle={{fontWeight: 'bold'}}>Sign Up</IndexLink>
               </li> : <span></span>
              }       
            { this.props.user.data !== null ?
             this.aditionalStuff() : <span></span>
            }
              { this.props.user.data !== null && this.props.user.data.username !== undefined ?  
              <li className="HeaderUserCredentials">
                <div className="HeaderUserCredentialsContainer">
                <span>{this.props.user.data.username + " "}</span>
                <a onClick={this.onClick2}>Log out</a></div>
              </li>  : ""            
              }
          </ul>
        </div>
        <div style={this.subpanelStyles} className={styles.primaryHeader__secondaryMenu + ' top_bar_right'}>
          <form onSubmit={this.onSearch}>
            <div className={styles.menu}>
              <div className={styles.primaryHeader__secondaryMenu_searchElement + " primaryHeader__secondaryMenu-searchInput"}>
                <input type="search" placeholder="Search notes"/>
              </div>
              <div className={styles.primaryHeader__secondaryMenu_searchElement + " primaryHeader__secondaryMenu-searchButton"}>
                <input type="submit" className="button" value="Create note"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)
