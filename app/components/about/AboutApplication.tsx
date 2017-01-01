import * as React from "react";
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Header from '../commons/Header';

interface AboutApplicationPr extends React.Props<any>{}
interface AboutApplicationState{}

export class AboutApplication extends React.Component<AboutApplicationPr, AboutApplicationState>{
  constructor(){
    super();
    console.log(this);
  }

 componentDidMount () {}  
 componentDidUpdate () {}  

  render(){
    return  (
      <div>
        <h1>About</h1>     
        <h4>Paper concept</h4>
        <ul>
          <h4>Tasks(10 hours):</h4>
            <li>Update for content(in modal window) + move order</li>
            <li>Minority compatibility</li>
            <li>Bulk addition</li>
            <li> auth for backend</li>
            <li>browser plugin[tab push]</li>
            <li>Winds repo get info</li>
        </ul> 
      </div>
    );
  }
}
