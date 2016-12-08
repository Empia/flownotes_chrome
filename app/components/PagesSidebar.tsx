import * as React from "react";
import {Header} from './Header';
interface PagesSidebarProps extends React.Props<any>{
  key:string;
}

interface PagesSidebarState{ 
}

class PagesSidebar extends React.Component<PagesSidebarProps, PagesSidebarState>{
  pages = [{key: '1', title: 'Page 1'}, {key: '2', title: 'Page 2'}, {key: '3', title: 'Page 3'}]
  constructor(){
    super();
  }
  
  
  render(){
    return  (
      <div>
        {this.pages.map((p, idx) => <div key={"page" + idx}>{p.title}</div>)}
      </div>
      );
  }
  
}

export {PagesSidebar}