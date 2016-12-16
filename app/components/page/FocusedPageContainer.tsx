import * as React from "react";
import { connect } from 'react-redux';
let PageContentForm = require('./PageContentForm.jsx');

import * as actions from '../../stores/page/PageActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";

const mapStateToProps = ({addingPageContent, pageContents}) => ({
  addingPageContent,
  pageContents
});


const mapDispatchToProps = dispatch => ({
    toggleAddPageContent: () => dispatch(actions.toggleAddPageContent()),
    removePageContent: (pageId, pageContentId) => dispatch(actions.removePageContent(pageId, pageContentId)),
   // updatePage: (pageId) => dispatch(actions.removePage(pageId)),
    addPageContent: (pageId,content) => dispatch(actions.addPageContent(pageId, content)),
});


interface PageContentProps extends React.Props<any>{
  handleSubmit: any;
}
interface PageContentState{}

interface FocusedPageContainerProps extends React.Props<any>{
  pageId:string;
  params: any;
  removePageContent: any;
  addingPageContent: any;
  pageContents: any;
  toggleAddPageContent: any;
  addPageContent: any;

}

interface FocusedPageContainerState{ 
}
function RemoveButton(props) {
  return <button onClick={() => props.toRemove(props.pageId, props.contentId)}>Remove</button>
}

class FocusedPageContainer extends React.Component<FocusedPageContainerProps, FocusedPageContainerState>{
  
  constructor(){
    super();
    console.log('PageContentForm', PageContentForm);
    //this.pageId = this.props.params.pageId
  }
  
  componentWillMount() {
    store.dispatch(actions.fetchPageContent(this.props.params.pageId)).then(() =>
      console.log(store.getState())
    )    
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.pageId !== this.props.params.pageId) {
      store.dispatch(actions.fetchPageContent(nextProps.params.pageId)).then(() =>
        console.log(store.getState())
      )    
    }
  }
  componentDidUpdate() {
/*
    console.log('componentDidUpdate', this);
    var el =ReactDOM.findDOMNode(this.refs.add) as HTMLElement
    if (el) el.focus();
*/
  }




  createPageContent = (values) => {
    console.log('values',values);
    /*
    if (evt.which !== 13) return;
    console.log('ref', this.refs);
    var title = (ReactDOM.findDOMNode(this.refs.add) as HTMLInputElement).value;
    this.props.addPage({title});
    this.props.toggleAddPage();
    */
    this.props.addPageContent(this.props.params.pageId,values);
    this.props.toggleAddPageContent();
  }
  updatePage = (evt) => {
    console.log('ref', this.refs, evt.currentTarget);
  //  this.props.addPage(title );
  //  this.props.toggleAddPage();
  }
  removePageSender = ((pageId, pageContentId) => this.props.removePageContent(pageId, pageContentId))



  render(){
    let initialValues = {
        inPageId: this.props.params.pageId
    };
    return  (
      <div className="pageContent">
        <h3 className="pageContent__pageHeader">Page {this.props.params.pageId}</h3>
        <button onClick={ e => this.props.toggleAddPageContent() }>Add page</button>
        <div className="pageContent__contentCreateToggle">
           { this.props.addingPageContent && <PageContentForm.default 
                                          pageId={this.props.params.pageId} 
                                          initialValues={initialValues} 
                                          onSubmit={this.createPageContent}/>}
        </div>        
        <div className="pageContent__contentList">
          <ul>
            {this.props.pageContents.page_content.map((p, idx) => 
              <div className="page" key={p._id}>
              <li>{p.title}</li>
              <input ref={"update-"+p._id} onKeyPress={this.updatePage(idx)}/>
              <RemoveButton pageId={p.pageId} contentId={p._id} toRemove={ this.removePageSender }/></div>)}

          </ul>
         </div>
      </div>
      );
  }  
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FocusedPageContainer);
