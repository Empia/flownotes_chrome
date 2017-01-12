import * as React from "react";
let PageContentForm = require('./forms/PageContentForm.jsx');
import * as actions from '../../stores/page/PageActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";
import { connect } from 'react-redux';
import { openDialog, closeDialog } from 'redux-dialog';
import * as BasicDialog from './forms/BasicDialog';
import {DropdownButton, MenuItem} from 'react-bootstrap';

function RemoveButton(props) {
  return <button onClick={() => props.toRemove(props.pageId, props.contentId)}>Remove</button>
}
function ContentRender(props) {
  if (props.content_type === 'Link') {
    return <div>
     <h3><span>{props.content_order+" "}</span>{props.content_title}</h3>
      <a href={props.content_value}>{props.content_value}</a>
    </div>
  } else {
    return <span>{props.content_value}</span>
  }
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface StateProps {}
const mapStateToProps = ({addingPageContent, pageContents, pages, selectedPage}) => ({});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface DispatchProps {
  removePageContent: (pageId: void, pageContentId: void) => void;
  openDialog: any;
}
const mapDispatchToProps = dispatch => ({
    removePageContent: (pageId, pageContentId) => dispatch(actions.removePageContent(pageId, pageContentId)),
    openDialog: (dialogId) => dispatch(openDialog(dialogId))
});
////////////////////////////////////////////////////////
interface GenericPageContentOwnProps extends React.Props<any>{
  contentObject: any;
  contentIdx: any;
}
interface GenericPageContentState{}
type GenericPageContentProps = GenericPageContentOwnProps & StateProps & DispatchProps;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////




class GenericPageContent extends React.Component<GenericPageContentProps, {}>{
  componentDidUpdate() {}

  removePageSender = ((pageId, pageContentId) => this.props.removePageContent(pageId, pageContentId));

  openModalWindow = (evt) => {
          evt.preventDefault();
          this.props.openDialog('signupDialog'); 
  };

  render(){
    let p = this.props.contentObject;
    let idx = this.props.contentIdx;
    return  (
      <div className="page" key={p._id}>
      {/*
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}>
              <PageContentForm.default 
                pageId={p.pageId} 
                initialValues={p} 
                form={'update_content_form'+p._id}
                onSubmit={this.updatePageContent}/>
        </Modal>
      </div>
      */}

        {/* 
        <div className="pageContent__contentResource-content_type">content_type: { p.content_type}</div>
        
        */}
        <div className="pageContent__contentResource-content_value">
          <ContentRender content_type={p.content_type} content_title={p.title} content_value={p.content_value} />
        </div>

        <div className="pageContent__contentResource-content_controls">

          <DropdownButton bsStyle="default" title={'...'} key={'dropdown-'+p._id} id={`dropdown-basic-${p._id}`}>
            <RemoveButton pageId={p.pageId} contentId={p._id} toRemove={ this.removePageSender }/>
            <MenuItem eventKey="1" onClick={this.openModalWindow}>Modal</MenuItem>
            <MenuItem eventKey="2">Action</MenuItem>
            <MenuItem eventKey="3">Another action</MenuItem>
            <MenuItem eventKey="4" active>Active Item</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="5">Separated link</MenuItem>
          </DropdownButton>
          {/*
          <div className="pageContent__contentResource-inPageId">inPageId: { p.inPageId}</div>
          <div className="pageContent__contentResource-inContent">inContent: { p.inContent}</div>
          <div className="pageContent__contentResource-labels">labels: { p.labels}</div>              
        <input ref={"update-"+p._id} onKeyPress={this.updatePage(idx)}/>
          */}
        </div>
      </div>);
  }  
}
 

export default connect<StateProps,DispatchProps,GenericPageContentOwnProps>(mapStateToProps, mapDispatchToProps)(GenericPageContent);
