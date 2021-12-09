import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart, decrement, updateCount } from '../../store/cart';
import { updateCartThunk } from '../../store/cart';

function CartItem({ item}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const [products, setProducts] = useState([])
  const [rating, setRating] = useState('')

  const sessionUser = useSelector((state) => state.session);

  // console.log("cart item quanitty", quantity)
  // console.log("item in cartitem", item)

  useEffect(() => {
    setQuantity(item.quantity);
    return () => clearInterval(setQuantity(item.quantity));
  }, [item.quantity]);


  // NOTE: so the cart.id doesn't have any meaning, we connect the user to their cart
  // by just using the user_id in the cart table
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/products/cart/${user_id}`)
      const productsList = await response.json()
      // console.log("productList", productsList)
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

  // if(item.id) {
  //   return item
  // } else {
  //   return null
  // }

  // console.log("products in cart component", products)
  const productsArray = Object?.values(products)
  const getProductTitle = (item_id) => {
    const productTitle = productsArray.filter(function(el){
      return el.id === item_id
    });
    if (getProductTitle) {
      return productTitle[0]?.title
    }
    else {
      return null
    }
  }

  let id = item.id // the id of the cart with the item
  let product_id = item.product_id
  // console.log("user_id before handleSubmit", user_id)
  const handleSubmit = async(e) => {
    e.preventDefault();

    const editItem = {
      id, user_id, product_id, quantity
    }
    console.log("handlesubmit", editItem)
    dispatch(updateCartThunk(editItem, id, user_id))
  }
  return (
    <>

{/*
        <form className="submit-review" onSubmit={handleSubmit}>
        <label>
            <input
              type="number"
              placeholder="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
             </input>
        </label>
        <button className="submit-cancel-review-button" type="submit" >+</button>

        </form> */}





    {/* { item.product_id?
    <li className="cart-item">
      <div className="cart-item-header">
        {
          getProductTitle(item.product_id)
        }
        {
          item.quantity
        }
      </div> */}

      {/* <div className="cart-item-menu"> */}

      <div className="cart-item-header">
        {
          getProductTitle(item.product_id)
        }
        {
          item.quantity
        }
      </div>
{
      item.id?

      <form className="submit-review" onSubmit={handleSubmit}>
        <label>
            <input
              type="number"
              placeholder="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
             </input>
        </label>
        <button className="submit-cancel-review-button" type="submit" >+</button>

        </form>
        : null}



        {/* <input
          type="number"
          onChange={(e) => setQuantity(+e.target.value + 1)}
          value={quantity}
          // onBlur={(e) => dispatch(updateCount(+item["id"], +e.target.value, item, user_id))}
          />
        <button
          type="submit"
          className="cart-item-button"
          // onClick={() => dispatch(addToCart(item.id))}
        >
          +
        </button> */}

        {/* </form> */}




        {/* <button
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
        </button> */}
      {/* </div> */}


{/* </form> */}
      </>
  )
}

export default CartItem;
