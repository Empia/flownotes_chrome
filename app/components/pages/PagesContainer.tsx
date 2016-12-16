import * as React from "react";
import Header from '../Header';
import PagesSidebar from './PagesSidebar';
import { connect } from 'react-redux';

interface PagesContainerProps extends React.Props<any>{
  key:string;
}

interface PagesContainerState{ 
}


class PagesContainer extends React.Component<PagesContainerProps, PagesContainerState>{
  
  constructor(){
    super();
  }
  
  //this.header = new Header();
  render(){
    return  (
      <div>
        <Header />
        <PagesSidebar key="test" />
        <div className="focusedPageContainer">
          { this.props.children }
        </div>        
      </div>
      );
  }
  
}

export default PagesContainer;