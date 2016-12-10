import * as React from "react";

interface GroceryItemListPr extends React.Props<any>{
}

interface GroceryItemListState{ 
}

class GroceryItemList extends React.Component<GroceryItemListPr, GroceryItemListState>{
  constructor(){
    super();
  }

 componentDidMount () {
} 
 
componentDidUpdate () {
}
  
  render(){
    return  (
      <div>f</div>
    );
  }
  
}

export {GroceryItemList}
