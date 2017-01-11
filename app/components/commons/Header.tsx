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
  logout
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
    e.preventDefault()
    this.props.logout();
  };

  render(){
    return  (
     <div className={styles.top_bar}>
        <div className="top_bar_left">
          <ul className={styles.menu}>
            <li className="menu_text product_logo">Flownotes</li>

            <li>
              <IndexLink to="/" 
              activeClassName="active" 
              activeStyle={{fontWeight: 'bold'}}>Pages</IndexLink>
            </li>
           <li>
              <IndexLink to="/login" 
              activeClassName="active" 
              activeStyle={{fontWeight: 'bold'}}>login</IndexLink>
            </li> 
            <li>
              <IndexLink to="/foo" 
              activeClassName="active" 
              activeStyle={{fontWeight: 'bold'}}>Foo</IndexLink>
            </li>
            <li>
              <Link to="/modes" activeClassName="active"  
              activeStyle={{fontWeight: 'bold'}}>Modes</Link>
            </li>
            <li>
              <Link to="/about" activeClassName="active"  
              activeStyle={{fontWeight: 'bold'}}>About</Link>
            </li>
            <li>
              <Link to="/examples" activeClassName="active" 
              activeStyle={{fontWeight: 'bold'}}>Examples</Link>
            </li>
            <li>
              { this.props.user.name !== undefined ?  
                <div>
                <p>User: {this.props.user.name + " "}</p>
                <a onClick={this.onClick2}>Log out</a></div> : ""
              }
            </li>            
          </ul>
        </div>
        <div className={styles.primaryHeader__secondaryMenu + ' top_bar_right'}>
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
