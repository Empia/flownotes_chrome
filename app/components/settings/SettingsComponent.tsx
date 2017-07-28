import * as React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, IndexLink } from 'react-router'
import * as actions from '../../stores/user_modes/UserModesActions';
import { connect } from 'react-redux';
import ReactDOM = require("react-dom");
import {store} from '../../main';
var Select = require('react-select');
import {DropdownButton, MenuItem, Button} from 'react-bootstrap';

interface UserModesPr extends React.Props<any>{
}
interface UserModesState{}

const mapStateToProps = ({addingModes, modes, sets_modes}) => ({
});

const mapDispatchToProps = dispatch => ({

});

export class SettingsComponent extends React.Component<UserModesPr, UserModesState>{
  constructor(){
    super();
    console.log(this);
  }

 componentDidMount () {}  
 componentDidUpdate () {}  


  render(){
    let props = this.props;
    return  (<div className="settings-container">Settings</div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
