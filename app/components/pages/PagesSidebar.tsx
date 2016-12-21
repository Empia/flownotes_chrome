import * as React from "react";
import ReactDOM = require("react-dom");
import { connect } from 'react-redux';
import * as actions from '../../stores/pages/PagesActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";

const mapStateToProps = ({addingPage, pages}) => ({
  addingPage,
  pages
});

const mapDispatchToProps = dispatch => ({
    toggleAddPage: () => dispatch(actions.toggleAddPage()),
    removePage: (pageId) => dispatch(actions.removePage(pageId)),
   // updatePage: (pageId) => dispatch(actions.removePage(pageId)),
    addPage: (page) => dispatch(actions.addPage(page)),
});

interface PagesSidebarProps extends React.Props<any>{
  key:string;
  pages:any;
  addingPage:boolean;
  addPage:any;
  toggleAddPage:any;
  removePage: any;
}

interface PagesSidebarState{}

function RemoveButton(props) {
  return <button onClick={() => props.toRemove(props.pageId)}>Remove</button>
}
function EditButton(props) {
  return <button onClick={() => props.toEdit(props.pageId, props.currentObject)}>Edit</button>
}


class PagesSidebar extends React.Component<PagesSidebarProps, PagesSidebarState>{
  refs: {
    [key: string]: (Element);
    add: (HTMLInputElement);
  }
  componentWillMount() {
    store.subscribe( () => this.render() )
  }
  componentDidUpdate() {
    console.log('componentDidUpdate', this);
    var el =ReactDOM.findDOMNode(this.refs.add) as HTMLElement
    if (el) el.focus();
  }

  render(){
    console.log('rerendered', this);
    let props = this.props;
    return  (<div className="page__sidebar">
      <button onClick={ e => this.props.toggleAddPage() }>Add page</button>
      <ul className="pageListContainer">
        {props.pages.items.map((p, idx) => 
          <div className="pageContainer" key={p._id}>
            <li>
              <Link to={'/page/'+p._id} activeClassName="active" 
                    activeStyle={{fontWeight: 'bold'}}>{p.title}</Link>
            </li>
            <div className="pageControls">
              <form className="editPageForm">
                <input type="text" ref={"update-"+p._id} defaultValue={p.title}/>
                <EditButton pageId={p._id} currentObject={p} toEdit={ this.editPageSender }/>
                <RemoveButton pageId={p._id} toRemove={ this.removePageSender }/>
              </form>
            </div>
          </div>)}

      </ul>
      <div className="new-page-input">
        { props.addingPage && <input ref="add" onKeyPress={this.createPage}/> }
      </div>
      </div>);
  }


  createPage = (evt) => {
    if (evt.which !== 13) return;
    console.log('ref', this.refs);
    var title = (ReactDOM.findDOMNode(this.refs.add) as HTMLInputElement).value;
    this.props.addPage({title});
    this.props.toggleAddPage();
  }
  updatePage = (evt) => {
    console.log('ref', this.refs, evt.currentTarget);
  //  this.props.addPage(title );
  //  this.props.toggleAddPage();
  }
  removePageSender = ((pageId) => this.props.removePage(pageId))
  editPageSender = ((pageId, object) => {
    console.log('editPageSender', pageId, object);
    // this.updatePage()

  });

  
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesSidebar);