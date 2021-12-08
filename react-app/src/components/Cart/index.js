import User from "../User";

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { purchase, getCartItems } from '../../store/cart';
import { useParams} from 'react-router-dom';
import { getOneProduct } from "../../store/product";

// import CartItem from './CartItem';
import CartItem from "../CartItem";
import './Cart.css';

function Cart() {
  const dispatch = useDispatch();
  const {productId} = useParams()

  const productObject = useSelector((state)=>state.product)
  const cartItems = useSelector(getCartItems);
  console.log("cartItems", cartItems)
  console.log("productObj", productObject)

  useEffect(()=>{
    dispatch(getOneProduct(productId))
}, [dispatch, productId])


const product = Object.values(productObject)
if (!product.length) return null

console.log("product in cart", product)


  if (!cartItems || !cartItems.length) return (
    <div className="cart">
      No items in the cart. Start selecting items to purchase.
    </div>
  );

  const onSubmit = (e) => {
    e.preventDefault();
    window.alert(
      "Purchased the following:\n" +
      `${cartItems.map(item => `${item.count} of ${item.name}`).join('\n')}`
    );
    dispatch(purchase());
  }

  return (
    <div className="cart">
      <ul>
        {cartItems.map(item => <CartItem key={item} item={item}/>)}
      </ul>
      <hr />
      <form onSubmit={onSubmit}>
        <button type="submit">Purchase</button>
      </form>
    </div>
  )
}

export default Cart;
