import * as React from "react";
import {Header} from './Header';
import {PagesSidebar} from './PagesSidebar';
interface PagesContainerProps extends React.Props<any>{
  key:string;
}

interface PagesContainerState{ 
}

class PagesContainer extends React.Component<PagesContainerProps, PagesContainerState>{
  
  constructor(){
    super();
  }
  
  
  render(){
    return  (
      <div>
        <Header />
        <PagesSidebar key="test" />
        <article className='grocery-item row'>
        test
        </article>
      </div>
      );
  }
  
}

export {PagesContainer}