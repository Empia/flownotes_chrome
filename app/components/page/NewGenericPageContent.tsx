import * as React from "react";
let PageContentForm = require('./forms/PageContentForm.jsx');
import * as actions from '../../stores/page/PageActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";
import { connect } from 'react-redux';
import reduxDialog from 'redux-dialog';




////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface NewGenericStateProps {}
const mapStateToProps = ({addingPageContent, pageContents, pages, selectedPage}) => ({});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface NewGenericDispatchProps {}
const mapDispatchToProps = dispatch => ({});
////////////////////////////////////////////////////////
interface NewGenericPageContentOwnProps extends React.Props<any>{}
interface GenericPageContentState{}
type NewGenericPageContentProps = NewGenericPageContentOwnProps & NewGenericStateProps & NewGenericDispatchProps;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////




class NewGenericPageContent extends React.Component<NewGenericPageContentProps, {}>{
  componentDidUpdate() {}

  render(){
    return  (<div>ss</div>);
  }  
}

export default connect<NewGenericStateProps,
NewGenericDispatchProps,
NewGenericPageContentOwnProps>(mapStateToProps, mapDispatchToProps)(NewGenericPageContent);
