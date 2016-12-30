import * as React from "react";
let PageContentForm = require('./forms/PageContentForm.jsx');
import * as actions from '../../stores/page/PageActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";
import { connect } from 'react-redux';




////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface StateProps {}
const mapStateToProps = ({addingPageContent, pageContents, pages, selectedPage}) => ({});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface DispatchProps {}
const mapDispatchToProps = dispatch => ({});
////////////////////////////////////////////////////////
interface UpdatePageContentOwnProps extends React.Props<any>{}
interface GenericPageContentState{}
type GenericPageContentProps = UpdatePageContentOwnProps & StateProps & DispatchProps;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////




class UpdateGenericPageContent extends React.Component<GenericPageContentProps, {}>{
  componentDidUpdate() {}

  render(){
    return <div>ss</div>;
  }  
}


export default connect<StateProps,DispatchProps,UpdatePageContentOwnProps>(mapStateToProps, mapDispatchToProps)(UpdateGenericPageContent);