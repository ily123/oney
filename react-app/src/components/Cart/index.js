import User from "../User";

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { clearCartItems, getCartItems } from '../../store/cart';
import { useParams} from 'react-router-dom';
import { getOneProduct } from "../../store/product";
import { allCartItemsThunk } from "../../store/cart";
import { deleteCartItem } from "../../store/cart";
import { purchaseCart } from "../../store/cart";

// import CartItem from './CartItem';
import CartItem from "../CartItem";
import './Cart.css';

function Cart({count, setCount, open, setOpen}) {
  const dispatch = useDispatch();
  const {productId} = useParams()



  const productObject = useSelector((state)=>state.product)
  // const cartItems = useSelector(getCartItems);
  // console.log("cartItems", cartItems)
  // console.log("productObj", productObject)

  const cartItemsObj = useSelector((state)=>state.cart)
  const cartItems = Object.values(cartItemsObj)
  // console.log("cartItems in cart component", cartItems)

  const sessionUser = useSelector((state) => state.session);
  const user_id = sessionUser?.user.id
  // console.log("user_id in component", user_id)

  useEffect(()=>{
    dispatch(getOneProduct(productId));
    return () => clearInterval(getOneProduct(productId));
}, [dispatch, productId, count, cartItems.length, open])

  useEffect(() => {
    dispatch(allCartItemsThunk(user_id))
    // dispatch(clearCartItems())

    return () => clearInterval(allCartItemsThunk(user_id));
  }, [dispatch, user_id, count, cartItems.length, open])

  // useEffect(() => {
  //   dispatch(clearCartItems())

  // },[dispatch])

  const products = Object.values(productObject)
  if (!products.length) return null
  // console.log("product in cart", products)

  if (!cartItems || cartItems.length <=2 ) return (
    <div className="cart">
      No items in the cart. Start selecting items to purchase.
    </div>
  );

  const getProductTitle = async (item_id) => {
    const productTitle = await products.filter(function(el){
      return el.id === item_id
    });
    if (getProductTitle) {
      console.log(getProductTitle)
      return productTitle[0]?.title
    }
    else {
      return "hello"
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    window.alert(
      "Thank you for purchasing! Your items will arrive in 2 business days."
      // "Purchased the following:\n" +
      // `${cartItems.map((item , idx)=>
      //  `${item?.quantity} of ${getProductTitle(item.product_id)}`).join('\n')}`
       );

      cartItems.map((item , idx)=> (dispatch(purchaseCart(item.id, user_id))))
    }

  return (
    <div className="cart">
      <ul>
        {cartItems.map(item => item.id?  <CartItem key={item} item={item} count={count} setCount={setCount}/> :null )}
      </ul>
      {/* <hr /> */}
      <form onSubmit={onSubmit}>
        <button className="purchase-button" type="submit">Purchase <i class="fas fa-shopping-cart"></i></button>
      </form>
    </div>
  )
}

export default Cart;
