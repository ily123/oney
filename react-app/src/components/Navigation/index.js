
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CategoryDropDown from './CategoryDropDown';
import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';

import { openCart, closeCart } from '../../store/cart';
import Cart from "../Cart";

const Navigation = () => {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);


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
            <button className="checkout-button" onClick={() => dispatch(openCart())}>
            <i className="fas fa-shopping-cart"></i>
            </button>
          </li>

          <div
        className="sidebar"
        style={showCart ? { transform: 'translateX(-100%)' } : {}}
      >
        <div className="sidebar-header">
        <button className="arrow-button" onClick={() => dispatch(closeCart())}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <Cart />
      </div>

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
