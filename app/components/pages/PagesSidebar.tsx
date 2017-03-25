import * as React from "react";
import ReactDOM = require("react-dom");
import { connect } from 'react-redux';
import * as actions from '../../stores/pages/PagesActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";
let NewPageForm = require('./forms/NewPageForm.jsx');
let EditPageForm = require('./forms/EditPageForm.jsx');

import {DropdownButton, MenuItem, Button} from 'react-bootstrap';
const styled = require('styled-components').default;
import NewPageModal from './forms/NewPageModal';

const mapStateToProps = ({addingPage, editingPage, pages, form, routing}) => ({
  addingPage,
  editingPage,
  pages,
  form,
  routing
});
const mapDispatchToProps = dispatch => ({
    toggleAddPage: () => dispatch(actions.toggleAddPage()),
    toggleEditPage:(pageId) => dispatch(actions.toggleEditPage(pageId)),
    removePage: (pageId) => dispatch(actions.removePage(pageId)),
    openNewPageForm: () => dispatch(actions.toggleAddPage()),
   // updatePage: (pageId) => dispatch(actions.removePage(pageId)),
    addPage: (page) => dispatch(actions.addPage(page)),
    updatePage: (pageId, page) => dispatch(actions.updatePage(pageId, page)),
});
interface PagesSidebarProps extends React.Props<any>{
  sideBarStyles?: any;
}

interface PagesSidebarState{modalIsOpen: any;}
interface StateProps {
  addingPage:any;
  editingPage:any;
  pages:any;
  form:any;
  routing:any;  
}
interface DispatchProps {
  toggleAddPage:any;
  toggleEditPage:any;
  removePage:any;
  addPage:any;
  updatePage:any;
}
type GenericPageContentProps = PagesSidebarProps & StateProps & DispatchProps;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function RemoveButton(props) {
  return <button onClick={() => props.toRemove(props.pageId)}>Remove</button>
}
function EditButton(props) {
  return <button onClick={ e => props.toEdit(e, props.pageId, props.currentObject) }>Edit</button>
}

const LinkTest = styled.div`
    font-family: 'Cabin';
    font-weight: bold;
    font-size: 1.2rem;
    letter-spacing: 0.05em;
    color: {props => props.theme.primaryColor};
    display: block;
    cursor: pointer;
    transition: 0.3s background ease-out;
    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;




class PagesSidebar extends React.Component<GenericPageContentProps, PagesSidebarState>{
  refs: {
    [key: string]: (Element);
    add: (HTMLInputElement);
  }

  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
  }
  componentWillMount() {
    store.subscribe( () => this.render() )
  }
  componentDidUpdate() {
    //console.log('componentDidUpdate', this);
    var el =ReactDOM.findDOMNode(this.refs.add) as HTMLElement
    if (el) el.focus();
  }


  openModal = () => {this.props.toggleAddPage()}
  closeModal = () => {this.props.toggleAddPage()}
  openEditModal = () => {this.props.toggleEditPage()}
  closeEditModal = () => {this.props.toggleEditPage()}  
  afterOpenModal = () => {
    let el = this.refs as any
    el.add_btn.style.color = 'white';
  }  
  editFormInitialValues = (pages, pageId) => {
    if (pageId !== undefined && pages !== undefined) {
      return {
        pageId: pageId,
        title: pages.find(function(p){return p._id == pageId}).title
      }
    } else {
      return {}
    }
  }

  render(){
    let props = this.props;
    let addBtnActive = props.addingPage ? 'active ' : '' 
    return  (<div className="page__sidebar" style={props.sideBarStyles}>
      {/* Modals */}
      <NewPageModal openModal={this.openModal} afterOpenModal={this.afterOpenModal} closeModal={this.closeModal} state={props.addingPage}>
        <NewPageForm.default pages={props.pages.items} handleSubmit={this.createPage}/>
      </NewPageModal>


      <NewPageModal openModal={this.openEditModal} afterOpenModal={this.afterOpenModal} 
                    closeModal={this.closeEditModal} 
                    state={props.editingPage.state}>
        <EditPageForm.default pages={props.pages.items} 
                              initialValues={this.editFormInitialValues(props.pages.items, props.editingPage.pageId)} 
                              pageId={props.editingPage.pageId} handleSubmit={this.editPageSender}/>
      </NewPageModal>


      <button onClick={this.openModal} ref="add_btn" active="props.addingPage" 
              className={addBtnActive+'btn btn-success addPage'}>Add page</button>
      <ul className="pageListContainer">
        {props.pages.items.sort((b,c) => (+ new Date(b.createdAt)) - (+ new Date(c.createdAt)) ).map((p, idx) => 
          <div className="pageContainer">
            <li><Link to={'/page/'+p._id} key={p._id} activeClassName="active"
                activeStyle={{fontWeight: 'bold'}}><span className="pagePrimaryLink">{p.title}</span></Link>

              <div className="pageDropdownButton">
                <DropdownButton bsStyle="default" title={''} key={'dropdown-'} id={`dropdown-basic-`}>
                  <MenuItem eventKey="1" onClick={ e => props.toggleEditPage(p._id) } >Rename</MenuItem>
                  <MenuItem eventKey="2" onClick={ e => props.removePage(p._id) } >Remove</MenuItem>
                </DropdownButton>                          
              </div>
            </li>
            {/*
            <div className="pageControls">
              <form className="editPageForm">
                <input type="text" ref={"update-"+p._id} defaultValue={p.title}/>
                <EditButton pageId={p._id} currentObject={p} toEdit={ this.editPageSender }/>
                <RemoveButton pageId={p._id} toRemove={ this.removePageSender }/>
              </form>
            </div>
            */}
          </div>)}
      </ul>
      </div>);
  }


  createPage = (evt) => {
    console.log('evt', evt, this.props.form.values);
    evt.preventDefault();
    this.props.addPage(this.props.form['new-page-form'].values);
    this.props.toggleAddPage();
  }
  
  editPageSender =  (evt) => {
      evt.preventDefault();
      console.log('editPageSender', evt);
      console.log('edit', this.props.form['edit-page-form'])
      let values = this.props.form['edit-page-form'].values
      console.log('pageId', values);
      this.props.updatePage(values.pageId, {title:values.title})
  };


  removePageSender = ((pageId) => this.props.removePage(pageId));
}

export default connect<StateProps,DispatchProps,PagesSidebarProps>(mapStateToProps, mapDispatchToProps)(PagesSidebar);