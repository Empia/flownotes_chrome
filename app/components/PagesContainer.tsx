import * as React from "react";

interface PagesContainerProps extends React.Props<any>{
  item:Item;
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
      <article className='grocery-item row'>
      test
      </article>
      );
  }
  
}

export {PagesContainer}