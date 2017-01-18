import * as React from "react";
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import * as actions from '../../stores/user_modes/UserModesActions';
import { connect } from 'react-redux';
import ReactDOM = require("react-dom");
import {store} from '../../main';

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
  return <button onClick={() => props.toRemove(props.modeId)}>Remove</button>
}
function EditButton(props) {
  return <button onClick={ e => props.toEdit(e, props.modeId, props.currentObject) }>Edit</button>
}
function SwitchButton(props) {
  let switchF = (e) => {
    e.preventDefault(); 
    props.toSwitch(props.modeId, props.currentObject)
  };
  return <button onClick={ switchF }>Switch</button>
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
       console.log('')
    )    
  }
  refs: {
    [key: string]: (Element);
    add: (HTMLInputElement);
  }

 componentDidMount () {}  
 componentDidUpdate () {}  

  createMode = (evt) => {
    if (evt.which !== 13) return;
    console.log('ref', this.refs);
    var title = (ReactDOM.findDOMNode(this.refs.add) as HTMLInputElement).value;
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
  removeSetModeSender = ((modeId) => this.props.removeSetMode(modeId));
  switchModeSender = ((modeId,mode) => this.props.switchMode(modeId,mode));


  render(){
    let props = this.props;
    return  (<div className="">
      <button onClick={ e =>
                           this.props.toggleAddMode() }>Add mode</button>
                           Modes
      <ul className="">
        {props.modes.items.map((p, idx) => 
          <div className="" key={p._id}>
            <li>{p.title}</li>
            <div className="pageControls">
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
        { this.props.addingModes ? <input ref="add" onKeyPress={this.createMode}/> : <div></div> }
      </div>      
      Switched modes
    <ul className="">
        {props.sets_modes.items.map((p, idx) => 
          <div className="" key={p._id}>
            <li>{p._id}</li>
            <div className="pageControls">
              <form className="editPageForm">
                <RemoveButton modeId={p._id} toRemove={ this.removeSetModeSender }/>
              </form>
            </div>
          </div>)}
      </ul>      
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserModes);