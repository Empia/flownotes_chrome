import * as React from "react";
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Header from '../commons/Header';

interface UserModesPr extends React.Props<any>{}
interface UserModesState{}

export class UserModes extends React.Component<UserModesPr, UserModesState>{
  constructor(){
    super();
    console.log(this);
  }

 componentDidMount () {}  
 componentDidUpdate () {}  

  render(){
    return  (
      <div>
        <h1>Modes</h1>     
      </div>
    );
  }
}

export default UserModes;