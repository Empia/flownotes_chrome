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
                <IndexLink to="/foo" activeClassName={styles.active} activeStyle={{fontWeight: 'bold'}}>Foo</IndexLink>
              </li>
              <li>
                <Link to="/modes" activeClassName={styles.active} activeStyle={{fontWeight: 'bold'}}>Modes</Link>
              </li>
              <li>
                <Link to="/about" activeClassName={styles.active} activeStyle={{fontWeight: 'bold'}}>About</Link>
              </li>
              <li>
                <Link to="/examples" activeClassName={styles.active} activeStyle={{fontWeight: 'bold'}}>Examples</Link>
              </li>
            </span>)
  }

  render(){
    return  (
     <div className={styles.top_bar}>
        <div className="top_bar_left">
          <ul className={styles.menu}>
          <div className="product-detail-section">
            <li className="menu_text product_logo">
              <IndexLink to="/" 
                activeClassName={styles.active}  
                activeStyle={{fontWeight: 'bold'}}>      
              <div className="flonotes_logo" dangerouslySetInnerHTML={{__html: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 400 300" enable-background="new 0 0 400 300" xml:space="preserve">
<g id="_x23_593b43ff">
  <path fill="#593B43" d="M0,0h0.2C0.1,0,0,0.1,0,0.2V0z"/>
  <path fill="#593B43" d="M169.4,111.5c8.8-8.1,20.7-12.8,32.7-12.5c18.5-0.5,36.1,11.4,43.8,28c-3.9,0-7.7,0.1-11.5,0
    c-6.9-10.8-19.3-18-32.2-17.8c-15.6-0.4-30.6,10.3-35.7,25c-3.4,9.4-2.9,20.2,1.4,29.2c4.7,10.2,14.3,17.9,25.2,20.6
    c16.7,4.3,36.2-4.4,42.9-20.6c-2.9,0.9-8.6-0.3-8.6-0.3c-3.9,5.3-8.9,9.9-15.2,12c-9.6,3.5-21.2,1.6-29-5.1
    c-7-5.8-11.4-14.8-10.8-24c0.1-14.8,12.9-28.2,27.7-28.7c8.6-0.8,17.3,2.7,23.3,8.8l0.5,1c-7.9,0.1-15.8,0-23.7,0
    c-11.8,0.7-20.9,13.7-17.3,25.1c2.5,9.8,13.1,16.4,23,14.2c4.7-0.9,9-3.6,11.9-7.5c-5.5-0.2-11.1,0-16.6-0.1c-4.8,0-8.9-3.7-10.6-8
    c22.2-0.1,44.5,0.1,66.7,0c1.8,3.8,4.9,7.1,9.2,8c-6,0.2-11.9-0.2-17.9,0.2c-3.3,13.4-12.8,24.9-25.2,31
    c-13.1,6.6-29.3,6.6-42.5,0.2c-16.2-7.7-27.4-25.2-26.8-43.3C153.5,133.6,159.6,120.5,169.4,111.5z"/>
  <path fill="#593B43" d="M190.4,143.1c1.6-4.4,5.8-8.1,10.6-8.1c21.7,0,43.5,0,65.2,0c-4.1,1-7.3,4-8.8,7.9
    C235.1,143.2,212.7,143,190.4,143.1z"/>
  <path fill="#593B43" d="M267.5,143.6c4.3-2.3,7.5,5,3.1,6.8C266.2,152.7,263,145.4,267.5,143.6z"/>
</g>
<g id="_x23_df5152ff">
</g>
<g id="_x23_f6c666ff">
  <path fill="#F6C666" d="M166.3,134.1c5.1-14.7,20.1-25.3,35.7-25c12.9-0.3,25.4,6.9,32.2,17.8l-10.5,0.2c-6-6.2-15.2-10.7-23.8-9.8
    c-14.8,0.5-27.7,13.9-27.7,28.7c-0.6,9.2,3.8,18.2,10.8,24c7.8,6.7,19.4,8.6,29,5.1c6.3-2.1,11.3-6.8,15.2-12l8.6,0.3
    c-6.7,16.1-26.2,24.9-42.9,20.6c-10.9-2.6-20.5-10.4-25.2-20.6C163.4,154.3,162.9,143.5,166.3,134.1z"/>
  <path fill="#F6C666" d="M266.2,135c4.3-0.6,9.1,0.2,12,3.7c4.6,4.8,4.2,13.3-1,17.5c-2.9,2.9-7.1,3.2-11,2.7
    c-4.3-0.9-7.3-4.2-9.2-8c-22.3,0.1-44.5,0-66.7,0c-0.2-2.6-0.2-5.3,0-7.9c22.3-0.1,44.7,0.1,67.1-0.2
    C258.9,139.1,262.1,136,266.2,135 M267.5,143.6c-4.5,1.8-1.3,9.1,3.1,6.8C275,148.6,271.8,141.4,267.5,143.6z"/>
</g>
</svg>`}}></div>
<span className="primary-product-title">Flownotes</span></IndexLink></li>
</div>
          <div className="product-detail-outter-nav">

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
              <IndexLink to="/settings" 
              activeClassName={styles.active} 
              activeStyle={{fontWeight: 'bold'}}>Settings</IndexLink>                

                <a onClick={this.onClick2}>Log out</a></div>
              </li>  : ""            
              }
            </div>
          </ul>
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
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)
