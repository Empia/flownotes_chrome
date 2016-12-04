import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/popup.html' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/popup/counter' activeClassName='route--active'>
      Counter
    </Link>
  </div>
)

export default Header
