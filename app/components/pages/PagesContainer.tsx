import * as React from "react";
import Header from '../commons/Header';
import PagesSidebar from './PagesSidebar';
import { connect } from 'react-redux';
//import { EmailSignUpForm } from "redux-auth/default-theme";
//import * as EmailSignUpForm from "redux-auth/src/views/default/index.js";


interface PagesContainerProps extends React.Props<any>{
  key:string;
}
interface PagesContainerState{ }

class PagesContainer extends React.Component<PagesContainerProps, PagesContainerState>{
    constructor(){
    super();
    console.log('EmailSignUpForm', null);
  }
  
  render(){
    return  (
      <div>
        <div className="header_component">
          <Header />
        </div>
        <div className="pagesSidebar_component">  
          <PagesSidebar key="test" />
        </div>
        <div className="focusedPageContainer">
          { this.props.children }
        </div>        
      </div>
      );
  }
}

export default PagesContainer;