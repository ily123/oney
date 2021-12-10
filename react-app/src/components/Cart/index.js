import User from "../User";

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCartItems } from '../../store/cart';
import { useParams} from 'react-router-dom';
import { getOneProduct } from "../../store/product";
import { allCartItemsThunk } from "../../store/cart";
import { deleteCartItem } from "../../store/cart";

// import CartItem from './CartItem';
import CartItem from "../CartItem";
import './Cart.css';

function Cart() {
  const dispatch = useDispatch();
  const {productId} = useParams()

  const productObject = useSelector((state)=>state.product)
  // const cartItems = useSelector(getCartItems);
  // console.log("cartItems", cartItems)
  // console.log("productObj", productObject)

  const cartItemsObj = useSelector((state)=>state?.cart)
  const cartItems = Object?.values(cartItemsObj)
  // console.log("cartItems in cart component", cartItems)


  const sessionUser = useSelector((state) => state.session);
  const user_id = sessionUser?.user.id
  // console.log("user_id in component", user_id)



  useEffect(()=>{
    dispatch(getOneProduct(productId))
}, [dispatch, productId])



  useEffect(() => {
    dispatch(allCartItemsThunk(user_id))
    return () => clearInterval(allCartItemsThunk(user_id));
  }, [dispatch, user_id, cartItems.length])




  const products = Object.values(productObject)
  if (!products.length) return null
  // console.log("product in cart", products)

  if (!cartItems || !cartItems.length) return (
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
      "Purchased the following:\n" +
      `${cartItems.map((item , idx)=>
       `${item?.quantity} of ${getProductTitle(item.product_id)}`).join('\n')}`
       );

cartItems.map((item , idx)=> (dispatch(deleteCartItem(item.id, user_id))))
  }

  return (
    <div className="cart">
      <ul>
        {cartItems.map(item => <CartItem key={item} item={item}/>)}
      </ul>
      {/* <hr /> */}
      <form onSubmit={onSubmit}>
        <button className="purchase-button" type="submit">Purchase <i class="fas fa-shopping-cart"></i></button>
      </form>
    </div>
  )
}

export default Cart;
