
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CategoryDropDown from '../CategoryDropDown';
import './Navigation.css';

const Navigation = () => {
  return (
    <div className="headerDiv">
      <nav>
        <ul className="navigation">
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Oney
            </NavLink>
          </li>
          <li>
            <form >
              <input className="searchForm" placeholder="Search Products"></input>
            </form>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li> */}
          <li>
            <i className="fas fa-shopping-cart"></i>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
      <CategoryDropDown />
    </div>
  );
}

export default Navigation;
