import * as React from "react";
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Header from '../commons/Header';
import DragContainer from '../commons/DragContainer';

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
        <DragContainer />
        <h1>About</h1>     
        <h4>Paper concept</h4>
        <ul>
          <h4>Tasks(9 hours):</h4>
          <li>Neural Modes</li>
          <hr />
            
            <li>Update for content(in modal window)</li>
            <li>Minority compatibility</li>
            <li>Bulk addition</li>
            <li>browser plugin[tab push]</li>
            <li>Winds repo get info</li>
            <hr />
            <li>Page nesting  [CRUD]</li>
            <li>Section on page [CRUD]</li>
            <li>better logo</li>
            <hr />
            <li>Object can be moved around pages Drag And drop + move order </li>
            <li>Heading object</li>
            <li>Paragraph</li>
            <li>List</li>
            <li>Img</li>
            <li>Link -> Heading, desk</li>
            <li>Code files -> Method, object</li>
            <p>[browser's tab module]</p>
            <li>Session for user</li>
            <li>Get all tabs</li>
            <li>Push session tabs</li>
            <li>Push deltas</li>
            <li>Calculate deltas for session</li>
            

        </ul> 
      </div>
    );
  }
}
