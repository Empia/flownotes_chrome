import * as React from "react";
import { connect } from 'react-redux';
let PageContentForm = require('./PageContentForm.jsx');
import * as actions from '../../stores/page/PageActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";


interface GenericPageContentProps extends React.Props<any>{}
interface GenericPageContentState{ }

class GenericPageContent extends React.Component<GenericPageContentProps, GenericPageContentState>{
  constructor(){
    super();
    //this.pageId = this.props.params.pageId
  } 
  componentDidUpdate() {
  }

  render(){
    return  (
      <div className="pageContent">
      </div>
      );
  }  
}
 
export default GenericPageContent;
