import * as React from "react";
import ReactDOM = require("react-dom");
import {Header} from './Header';
import { connect } from 'react-redux';
import * as actions from '../stores/Actions';
import {store} from '../main';

const mapStateToProps = ({addingPage, pages}) => ({
  addingPage,
  pages
});


const mapDispatchToProps = dispatch => ({
    addPage: name => dispatch(actions.addPage(name)),
    toggleAddPage: () => dispatch(actions.toggleAddPage())
});

interface PagesSidebarProps extends React.Props<any>{
  key:string;
  pages:Array<any>;
  addingPage:boolean;
  addPage:any;
  toggleAddPage:any;
}

interface PagesSidebarState{ 
}

class PagesSidebar extends React.Component<PagesSidebarProps, PagesSidebarState>{
  constructor(){
    super();
  }
  refs: {
    [key: string]: (Element);
    add: (HTMLInputElement);
  }
  componentWillMount() {
    store.subscribe( () => this.render() )
  }
  componentDidUpdate() {
    console.log('componentDidUpdate', this);
    var el =ReactDOM.findDOMNode(this.refs.add) as HTMLElement
    if (el) el.focus();
  }

  render(){
    console.log('rerendered', this);
    let props = this.props;
    return  (<div className="page__sidebar">
      <button onClick={ e => this.props.toggleAddPage() }>Add page</button>
      <ul>
        {props.pages.map((p, idx) => <li key={"page" + idx}>{p.title}</li>)}
      </ul>
      { props.addingPage && <input ref="add" onKeyPress={this.createPage}/> }
      </div>);
  }


  createPage = (evt) => {
    if (evt.which !== 13) return;
    console.log('ref', this.refs);
    var title = (ReactDOM.findDOMNode(this.refs.add) as HTMLInputElement).value;
    this.props.addPage(title );
    this.props.toggleAddPage();
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesSidebar);