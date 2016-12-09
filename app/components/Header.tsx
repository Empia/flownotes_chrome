import * as React from "react";
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

interface HeaderProps extends React.Props<any>{
}
interface HeaderState{}
class Header extends React.Component<HeaderProps, HeaderState>{
  constructor(){
    super();
  }
  render(){
    return  (
    <div>
       <ul>
        <li><Link to="/">Pages</Link></li>
        <li><Link to="/">Items</Link></li>
      </ul>
    </div>
    );
  }
}

export {Header}