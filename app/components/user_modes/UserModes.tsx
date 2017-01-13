import * as React from "react";
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import * as actions from '../../stores/user_modes/UserModesActions';
import { connect } from 'react-redux';
import ReactDOM = require("react-dom");

interface UserModesPr extends React.Props<any>{
  addingMode:any;
  modes:any;
  toggleAddMode:any;
  removeMode:any;
  addMode:any;
  updateMode:any;  
}
interface UserModesState{}
function RemoveButton(props) {
  return <button onClick={() => props.toRemove(props.modeId)}>Remove</button>
}
function EditButton(props) {
  return <button onClick={ e => props.toEdit(e, props.modeId, props.currentObject) }>Edit</button>
}


const mapStateToProps = ({addingMode, modes}) => ({
  addingMode,
  modes
});

const mapDispatchToProps = dispatch => ({
    toggleAddMode: () => dispatch(actions.toggleAddMode()),
    removeMode: (modeId) => dispatch(actions.removeMode(modeId)),
   // updatePage: (modeId) => dispatch(actions.removePage(modeId)),
    addMode: (mode) => dispatch(actions.addMode(mode)),
    updateMode: (modeId, mode) => dispatch(actions.updateMode(modeId, mode)),
});

export class UserModes extends React.Component<UserModesPr, UserModesState>{
  constructor(){
    super();
    console.log(this);
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

  render(){
    let props = this.props;
    return  (
      <div className="">
      
      <button onClick={ e => this.props.toggleAddMode() }>Add mode</button>
      <ul className="">
        {props.modes.items.map((p, idx) => 
          <div className="" key={p._id}>
            <li>{p.title}</li>
            <div className="pageControls">
              <form className="editPageForm">
                <input type="text" ref={"update-"+p._id} defaultValue={p.title}/>
                <EditButton modeId={p._id} currentObject={p} toEdit={ this.editModeSender }/>
                <RemoveButton modeId={p._id} toRemove={ this.removeModeSender }/>
              </form>
            </div>
          </div>)}
      </ul>



      <div className="new-mode-input">
        { props.addingMode && <input ref="add" onKeyPress={this.createMode}/> }
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserModes);