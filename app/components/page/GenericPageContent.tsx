import * as React from "react";
let PageContentForm = require('./forms/PageContentForm.jsx');
import * as actions from '../../stores/page/PageActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";
import { connect } from 'react-redux';
import { openDialog, closeDialog } from 'redux-dialog';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {ParagraphContentType,LinkContentType, HeadingContentType} from './content_types/index'

let PageContentEditForm = require('./forms/PageContentEditForm.jsx');


function RemoveButton(props) {
  return <button onClick={() => props.toRemove(props.pageId, props.contentId)}>Remove</button>
}
function ContentRender(props) {
  switch (props.content_type) {
    case 'Link':
        return <LinkContentType {...props} />
    case 'Heading':
        return <HeadingContentType {...props} />
    case 'Paragraph':
        return <ParagraphContentType {...props} />
    default:  
        return <span>{props.content_value}</span>
    }
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface StateProps {form:any;}
const mapStateToProps = ({addingPageContent, pageContents, pages, selectedPage, form}) => ({form});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface DispatchProps {
  removePageContent: (pageId: void, pageContentId: void) => void;
  openDialog: any;
  updatePageContent: (pageId:string, pageContentId:string, content:any) => void;
}
const mapDispatchToProps = dispatch => ({
    removePageContent: (pageId, pageContentId) => dispatch(actions.removePageContent(pageId, pageContentId)),
    openDialog: (dialogId) => dispatch(openDialog(dialogId)),
    updatePageContent: (pageId, pageContentId, content) => dispatch(actions.updatePageContent(pageId, pageContentId, content))
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

  openModalWindow = (modalId) => {
   return (evt) => {
          evt.preventDefault();
          this.props.openDialog(modalId); 
    }
  }
  editPageSender =  (evt) => {
      evt.preventDefault();
      console.log('editPageSender', evt);
      console.log('edit', this.props.form)
      let id = 'edit_page_form_'+this.props.contentObject._id
      let values = this.props.form[id].values
      console.log('pageId', values);
      this.props.updatePageContent(values.pageId, values.pageContentId, {title: values.title, content_value:values.content_value})
  };

  render(){
    let p = this.props.contentObject;
    let idx = this.props.contentIdx;
    let defaultValuesForEdit = {
      title: p.title,
      content_value: p.content_value,
      pageId: p.inPageId,
      pageContentId: p._id
    }
    return  (
      <div class="pageContentRoot">
      <div className="pageContentRootContainer" key={p._id}>
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
          <div className="pageContent__contentResource-content_value">
            <ContentRender content_page={p.page} 
                           content_order={p.order}
                           content_type={p.content_type} 
                           content_title={p.title} 
                           content_value={p.content_value} />
            <PageContentEditForm.default form={'edit_page_form_'+p._id} handleSubmit={this.editPageSender} initialValues={defaultValuesForEdit} />                           
          </div>

          <div className="pageContent__contentResource-content_controls">
            <DropdownButton bsStyle="default" title={'...'} key={'dropdown-'+p._id} id={`dropdown-basic-${p._id}`}>
              <MenuItem eventKey="0" onClick={() => this.removePageSender(p.pageId,p._id)}>Remove</MenuItem>
              <MenuItem eventKey="1" onClick={this.openModalWindow('editContentModal')}>Modal</MenuItem>
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
          <div className="pageContent__contentResource-content_type">order: { p.order } date: {p.createdAt} content_type: {p.content_type}</div>
        </div>
      </div>);
  }  
}
 

export default connect<StateProps,DispatchProps,GenericPageContentOwnProps>(mapStateToProps, mapDispatchToProps)(GenericPageContent);
