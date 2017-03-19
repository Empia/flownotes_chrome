import * as React from "react";
import Header from '../commons/Header';
import PagesSidebar from './PagesSidebar';
import { connect } from 'react-redux';
//import { EmailSignUpForm } from "redux-auth/default-theme";
import * as url2 from 'url-browser';
import * as actions from '../../stores/pages/PagesActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";


const mapStateToProps = ({routing}) => ({
  routing
});

const mapDispatchToProps = dispatch => ({
});



interface PagesContainerProps extends React.Props<any>{
  key:string;
  routing: any;
}
interface PagesContainerState{ }

class PagesContainer extends React.Component<PagesContainerProps, PagesContainerState>{
  constructor(){
    super();
  }

 sideBarVisibility = () => {
    let defaultStyles = {
      display: "inline-block",
      float: "left",
      width: "15%",
      borderRight: "1px solid rgb(228, 236, 234)",
      boxShadow: "1px 1px 1px #edeaea80",
      background: "#f1f9f7 none repeat scroll 0% 0%",
      padding: "17px 7px",
      position: 'fixed',
      marginTop: '-90px',   
      height: '100%',
      zIndex: '1',
      paddingTop: '88px'    
    }
    let pathname = this.props.routing.locationBeforeTransitions.pathname;
    let matchPage = pathname.match('/page')
    if (pathname === "/" || (matchPage && matchPage[0] === "/page")) {
      return {withBar: true, styles: defaultStyles};
    } else {
      return {withBar: false, styles: Object.assign(defaultStyles, {display: 'none'})};
    }
  }
  
  render(){
    const sideBarProp = this.sideBarVisibility();
    let croped = sideBarProp.withBar ? 'croped' : '';
    const containerLayout = `${croped} focusedPageContainer`
    return  (
      <div>
        <div className="header_component">
          <Header />
        </div>
        <div className="pagesSidebar_component">  
          <PagesSidebar key="te" sideBarStyles={sideBarProp.styles} />
        </div>
        <div className={containerLayout}>
          { this.props.children }
        </div>        
      </div>
      );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PagesContainer);
