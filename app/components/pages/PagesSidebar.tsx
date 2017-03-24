import * as React from "react";
import ReactDOM = require("react-dom");
import { connect } from 'react-redux';
import * as actions from '../../stores/pages/PagesActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";
let NewPageForm = require('./NewPageForm.jsx');
import {DropdownButton, MenuItem, Button} from 'react-bootstrap';
const styled = require('styled-components').default;
import NewPageModal from './forms/NewPageModal';

const mapStateToProps = ({addingPage, pages, form, routing}) => ({
  addingPage,
  pages,
  form,
  routing
});
const mapDispatchToProps = dispatch => ({
    toggleAddPage: () => dispatch(actions.toggleAddPage()),
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
  pages:any;
  form:any;
  routing:any;  
}
interface DispatchProps {
  toggleAddPage:any;
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


  openModal = () => {this.setState({modalIsOpen: true})}
  closeModal = () => {this.setState({modalIsOpen: false})}
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    console.log('this.refs', this.refs);
    let el = this.refs as any
    el.add.style.color = 'white';
  }  

  render(){
    console.log('rerendered', this);
    let props = this.props;
    let addBtnActive = props.addingPage ? 'active ' : '' 
    return  (<div className="page__sidebar" style={props.sideBarStyles}>
      <div className="new-page-input">
        { props.addingPage && <NewPageForm.default pages={props.pages.items} handleSubmit={this.createPage}/> }
      </div>      

      <button onClick={this.openModal} ref="add" active="props.addingPage" className={addBtnActive+'btn btn-success addPage'}>Add page modal</button>

      <button onClick={ e => props.toggleAddPage() } active="props.addingPage" className={addBtnActive+'btn btn-success addPage'}>Add page</button>
      <ul className="pageListContainer">
        {props.pages.items.map((p, idx) => 
          <Link to={'/page/'+p._id} key={p._id} activeClassName="active"
                    activeStyle={{fontWeight: 'bold'}}>
          <div className="pageContainer">
            <li>
            <span className="pagePrimaryLink">{p.title}</span>
              <div className="pageDropdownButton">
                <DropdownButton bsStyle="default" title={''} key={'dropdown-'} id={`dropdown-basic-`}>
                  <MenuItem eventKey="1" onClick={ e => console.log(e) } >Rename</MenuItem>
                  <MenuItem eventKey="2" onClick={ e => console.log(e) } >Remove</MenuItem>
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
          </div></Link>)}
      </ul>
      </div>);
  }


  createPage = (evt) => {
    console.log('evt', evt, this.props.form.values);
    evt.preventDefault();
    this.props.addPage(this.props.form['new-page-form'].values);
    this.props.toggleAddPage();
  }
  
  editPageSender =  (evt, pageId, page) => {
      evt.preventDefault();
      console.log('editPageSender', this.refs, evt.currentTarget);
      var title = (ReactDOM.findDOMNode(this.refs['update-'+pageId]) as HTMLInputElement).value;
      this.props.updatePage(pageId, {title})
  };


  removePageSender = ((pageId) => this.props.removePage(pageId));
}

export default connect<StateProps,DispatchProps,PagesSidebarProps>(mapStateToProps, mapDispatchToProps)(PagesSidebar);