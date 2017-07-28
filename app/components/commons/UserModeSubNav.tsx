import * as React from "react";
import { Router, Route, IndexRoute, Link, hashHistory, IndexLink } from 'react-router'
const styled = require('styled-components').default;


const NavList = styled.ul`
list-style: none;
display: flex;
justify-content: center;
`;

const NavListItem = styled.li`
  padding: 0px 10px 0px 10px;
`


const UserModeSubNav = () => {
  return (<NavList className="user-modes-overview-navbar-list">
                <NavListItem>
                  <Link to="/modes" activeClassName='active' activeStyle={{fontWeight: 'bold'}}>Modes</Link>
                </NavListItem>
                <NavListItem>
                  <IndexLink to="/tagger" activeClassName='active' activeStyle={{fontWeight: 'bold'}}>Tagger</IndexLink>
                </NavListItem>
                {/*
                <NavListItem>
                  <Link to="/about" activeClassName='active' activeStyle={{fontWeight: 'bold'}}>About</Link>
                </NavListItem>
                */}       
          </NavList>)
}

export default UserModeSubNav;