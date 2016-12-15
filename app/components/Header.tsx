import * as React from "react";
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router';
import Table from './Table';
import * as styles from './header.css';
import * as CSSModules from 'react-css-modules';

interface HeaderProps extends React.Props<any>{
}
interface HeaderState{}
class Header extends React.Component<HeaderProps, HeaderState>{

  onSearch() {
    console.log('good');
  }
  render(){
    return  (
     <div className={styles.top_bar}>
        <div className="top_bar_left">
          <ul className={styles.menu}>
            <li className="menu_text">Flownotes</li>
            <li>
              <IndexLink to="/" 
              activeClassName="active" 
              activeStyle={{fontWeight: 'bold'}}>Pages</IndexLink>
            </li>
            <li>
              <Link to="/items" activeClassName="active"  
              activeStyle={{fontWeight: 'bold'}}>Items</Link>
            </li>
            <li>
              <Link to="/examples" activeClassName="active" 
              activeStyle={{fontWeight: 'bold'}}>Examples</Link>
            </li>
          </ul>
        </div>
        <div className="top_bar_right">
          <form onSubmit={this.onSearch}>
            <ul className="menu">
              <li>
                <input type="search" placeholder="Search notes"/>
              </li>
              <li>
                <input type="submit" className="button" value="Create note"/>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default Header;