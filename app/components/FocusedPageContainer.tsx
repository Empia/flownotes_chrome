import * as React from "react";
import PagesSidebar from './PagesSidebar';
import { connect } from 'react-redux';

interface FocusedPageContainerProps extends React.Props<any>{
  pageId:string;
}

interface FocusedPageContainerState{ 
}


class FocusedPageContainer extends React.Component<FocusedPageContainerProps, FocusedPageContainerState>{
  
  constructor(){
    super();
  }
  
  
  render(){
    return  (
      <div>
        Page {this.props.pageId}
      </div>
      );
  }
  
}

export default FocusedPageContainer;
