import * as React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, IndexLink } from 'react-router'
import * as actions from '../../stores/user_modes/UserModesActions';
import { connect } from 'react-redux';
import ReactDOM = require("react-dom");
import {store} from '../../main';
var Select = require('react-select');
import NewUserModeModal from './forms/NewUserModeModal';
var NewUserModeForm = require('./forms/NewUserModeForm.jsx');
import {DropdownButton, MenuItem, Button} from 'react-bootstrap';
import UserModeSubNav from '../commons/UserModeSubNav';
interface UserModesPr extends React.Props<any>{
  addingModes:any;
  modes:any;
  sets_modes:any;
  toggleAddMode:any;
  removeMode:any;
  switchMode:any;
  addMode:any;
  updateMode:any;
  fetchSetsModes:any;
  updatedSetMode:any;
  removeSetMode:any;
}
interface UserModesState{}

function RemoveButton(props) {
 let funF = (e) => {
    e.preventDefault(); 
    props.removeSetMode(props.modeId)
  };  
  return <Button onClick={ funF }>Delete</Button>
}
function EditButton(props) {
  let funF = (e) => {
    e.preventDefault(); 
    props.toEdit(e, props.modeId, props.currentObject)
  };
  return <Button onClick={ funF }>Update</Button>
}
function SwitchButton(props) {
  let switchF = (e) => {
    e.preventDefault(); 
    props.toSwitch(props.modeId, props.currentObject)
  };
  return <Button onClick={ switchF }>Switch</Button>
}


const mapStateToProps = ({addingModes, modes, sets_modes}) => ({
  addingModes,
  modes,
  sets_modes
});

const mapDispatchToProps = dispatch => ({
    toggleAddMode: () => dispatch(actions.toggleAddMode()),
    removeMode: (modeId) => dispatch(actions.removeMode(modeId)),
    switchMode: (modeId,mode) => dispatch(actions.setMode(modeId, mode)),
   // updatePage: (modeId) => dispatch(actions.removePage(modeId)),
    addMode: (mode) => dispatch(actions.addMode(mode)),
    updateMode: (modeId, mode) => dispatch(actions.updateMode(modeId, mode)),
    fetchSetsModes:() => dispatch(actions.fetchSetsModes()),
    updatedSetMode:(modeId, mode) => dispatch(actions.updatedSetMode(modeId, mode)),
    removeSetMode:(modeId) => dispatch(actions.removeSetMode(modeId)),

});

export class UserModes extends React.Component<UserModesPr, UserModesState>{
  constructor(){
    super();
    console.log(this);
    store.dispatch(actions.fetchModes()).then(() =>
       store.dispatch(actions.fetchSetsModes()).then(() =>
        console.log('')
       )
    )    
  }
  refs: {
    [key: string]: (Element);
    add: (HTMLInputElement);
    nested: (HTMLInputElement);
  }

 componentDidMount () {}  
 componentDidUpdate () {}  

  createMode = (evt) => {
    if (evt.which !== 13) return;
    console.log('ref', this.refs);
    var title = (ReactDOM.findDOMNode(this.refs.add) as HTMLInputElement).value;
    var nested = (ReactDOM.findDOMNode(this.refs.nested) as HTMLInputElement).value;

    this.props.addMode({title});
    this.props.toggleAddMode();
  }
  editModeSender =  (evt, modeId, mode) => {
      evt.preventDefault();
      console.log('editPageSender', this.refs, evt.currentTarget);
      var title = (ReactDOM.findDOMNode(this.refs['update-'+modeId]) as HTMLInputElement).value;
      this.props.updateMode(modeId, {title})
  };
  removeModeSender = ((modeId) => this.props.removeMode(modeId));
  removeSetModeSender = ((e, modeId) => {
    e.preventDefault();
    this.props.removeSetMode(modeId)
  });
  switchModeSender = (modeId) => {
    let objectId = (() => {
      var m = Math
      var d = Date
      var h = 16
      var s = s => m.floor(s).toString(h)
      return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
    })();

    let mode = {_id: objectId, 
                userId:'',
                userModeId: modeId,
                createdAt: Date.now()
     }
    this.props.switchMode(objectId,mode)
  };
  getMode = (modeId) => {
    let mode = this.props.modes.items.find(c => c._id === modeId)
    if (mode) {
      return mode.title
    } else {
      return ''
    }
  }
 



  openModal = () => {this.props.toggleAddMode()}
  closeModal = () => {this.props.toggleAddMode()}
  openEditModal = () => {this.props.toggleAddMode()}
  closeEditModal = () => {this.props.toggleAddMode()}  
  afterOpenModal = () => {
    let el = this.refs as any
    //el.add_btn.style.color = 'white';
  }  

  render(){
    let props = this.props;
    return  (<div className="user-modes-container">
      <div className="user-modes-overview">
      <div className="user-modes-overview-navbar">
        <UserModeSubNav />
      </div>
      <div className="user-modes-overview-topbar">
        <div className="user-modes-overview-create-button">
        <Button onClick={ e =>
                             this.props.toggleAddMode() }>Add mode</Button>
        </div>
        <div className="user-modes-overview-title"><h4>Modes</h4></div>
      </div>

      <ul className="user-modes-overview-list">
        {props.modes.items.map((p, idx) => 
          <div className="user-mode-block" key={p._id}>
            <li className="user-mode-block-title">{p.title}</li>
            <div className="user-mode-block-controls pageControls">
              <form className="editPageForm">
                <input type="text" ref={"update-"+p._id} defaultValue={p.title}/>
                <SwitchButton modeId={p._id} currentObject={p} toSwitch={ this.switchModeSender }/>
                <EditButton modeId={p._id} currentObject={p} toEdit={ this.editModeSender }/>
                <RemoveButton modeId={p._id} toRemove={ this.removeModeSender }/>
              </form>
            </div>
          </div>)}
      </ul>
      <div className="new-mode-input">
        <NewUserModeModal openModal={this.openModal} 
                          afterOpenModal={this.afterOpenModal} 
                          closeModal={this.closeModal} 
                          state={props.addingModes}>
          <NewUserModeForm.default handleSubmit={this.createMode}/>
        </NewUserModeModal> 

        { this.props.addingModes ? <input ref="add" onKeyPress={this.createMode}/> : <div></div> }
      </div>      
      </div>


      <div className="switched-user-modes">
      <div className="switched-user-modes-title"><h4>Switched modes</h4></div>
        <ul className="switched-user-modes-lists">
          {props.sets_modes.items.sort((c,b) => +new Date(b.createdAt) - +new Date(c.createdAt)).map((p, idx) => 
            <div className="" key={p._id}>
              <li>{this.getMode(p.userModeId)}:{p._id}:{+new Date(p.createdAt)}</li>
              <div className="pageControls">
                <form className="editPageForm">
                  <RemoveButton modeId={p._id} removeSetMode={this.props.removeSetMode} toRemove={ this.removeSetModeSender }/>
                </form>
              </div>
            </div>)}
          </ul>      
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserModes);