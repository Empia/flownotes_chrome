import * as React from "react";
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router';
import Table from './Table';

interface HeaderProps extends React.Props<any>{
}
interface HeaderState{}
class Header extends React.Component<HeaderProps, HeaderState>{
  constructor(){
    super();
  }
  onSearch() {
    console.log('good');
  }
  render(){
    return  (
     <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Flownotes</li>
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
        <div className="top-bar-right">
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

export {Header}