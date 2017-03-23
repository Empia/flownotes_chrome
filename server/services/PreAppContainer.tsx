import * as React from "react";

interface GroceryItemListPr extends React.Props<any>{
}

interface GroceryItemListState{ 
}

class PreAppContainer extends React.Component<GroceryItemListPr, GroceryItemListState>{
  constructor(){
    super();
  }

 componentDidMount () {
} 
 
componentDidUpdate () {
}
  
  render(){
    return  (
      <div>Loading</div>
    );
  }
  
}

export {PreAppContainer}
