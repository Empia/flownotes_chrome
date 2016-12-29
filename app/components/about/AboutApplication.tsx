import * as React from "react";
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Header from '../commons/Header';

interface AboutApplicationPr extends React.Props<any>{}
interface AboutApplicationState{}

class AboutApplication extends React.Component<AboutApplicationPr, AboutApplicationState>{
  constructor(){
    super();
    console.log(this);
  }

 componentDidMount () {}  
 componentDidUpdate () {}  

  render(){
    return  (
      <div>
        <div className="header_component">
          <Header />
        </div>
        <h1>About</h1>      
      </div>
    );
  }
}

export {AboutApplication}
