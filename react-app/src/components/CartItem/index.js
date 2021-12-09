import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { removeFromCart, addToCart, decrement, updateCount } from '../../store/cart';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(item.count);


  const [products, setProducts] = useState([])

  const sessionUser = useSelector((state) => state.session);


  useEffect(() => {
    setCount(item.count);
  }, [item.count]);


  // NOTE: so the cart.id doesn't have any meaning, we connect the user to their cart
  // by just using the user_id in the cart table

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/products/cart/${user_id}`)
      const productsList = await response.json()
      console.log("productList", productsList)
      setProducts(productsList);
    }
    fetchData();
  },[])

  let user_id;
  if(sessionUser) {
    user_id = sessionUser?.user?.id
  } else {
    return null
  }

  console.log("products in cart component", products)

  


  // const getProductTitle = (item_id) => {

  //   const productTitle = products.filter(function(el){
  //     return el.id === item_id
  //   });
  //   if (getProductTitle) {
  //     return productTitle[0]?.title
  //   }
  //   else {
  //     return null
  //   }
  // }


  // item.product_id is where the product name should be defined

  return (
    <li className="cart-item">
      <div className="cart-item-header">
        {/* {item.product_id} */}
        {
          // getProductTitle(item.product_id)
        }
      </div>
      <div className="cart-item-menu">
        <input
          type="number"
          onChange={(e) => setCount(+e.target.value)}
          onBlur={(e) => dispatch(updateCount(item.id, +e.target.value))}
          value={count} />
        <button
          className="cart-item-button"
          onClick={() => dispatch(addToCart(+item.id))}
        >
          +
        </button>
        <button
          className="cart-item-button"
          onClick={() => dispatch(decrement(item.id))}
        >
          -
        </button>
        <button
          className="cart-item-button"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </li>
  )
}

export default CartItem;
