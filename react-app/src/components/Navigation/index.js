
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CategoryDropDown from './CategoryDropDown';
import './Navigation.css';
import SearchForm from './SearchForm'

const Navigation = () => {
  const sessionUser = useSelector(state=>state.session.user)
  // console.log("User://////////", sessionUser.id)


  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
      <ul className="nav2">
        <li>
          <span className="hiUser"> Welcome {sessionUser.username} !! </span>
        </li>
        <li>
          <i className="fas fa-shopping-cart"></i>
        </li>
        <li>
          <NavLink to="/new-product">Sell Product</NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    )
  } else {
    sessionLinks = (
      <ul className="nav2">
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
      </ul>
    )
  }


  return (
    <div className="headerDiv">
      <nav>
        <ul className="navigation">
          <li>
            <div className="Oney">
              <NavLink to='/' exact={true} activeClassName='active'>
                Oney
              </NavLink>
            </div>
          </li>
          <li>
            <SearchForm />
          </li>
          <li>
            {sessionLinks}
          </li>
        </ul>
      </nav>
      <CategoryDropDown />
    </div>
  );
}

export default Navigation;
