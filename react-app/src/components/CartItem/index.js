import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateCartThunk, deleteCartItem } from '../../store/cart';
import { clearCartItems } from '../../store/cart';
import './CartItem.css';

function CartItem({ item}) {
  const dispatch = useDispatch();
  let [quantity, setQuantity] = useState(item.quantity);
  const [products, setProducts] = useState([])

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
  const handleIncreaseQuantity = async(e) => {
    e.preventDefault();

    await setQuantity(() => {
      return quantity += 1
    })

     let editItem = {
      id, user_id, product_id, quantity
    }
    console.log("handlesubmit", editItem, quantity)
    dispatch(updateCartThunk(editItem, id, user_id))
  }


  const handleDecreaseQuantity = async(e) => {
    e.preventDefault();

    await setQuantity(() => {
      return quantity -= 1
    })

     let editItem = {
      id, user_id, product_id, quantity
    }
    console.log("handlesubmit", editItem, quantity)
    dispatch(updateCartThunk(editItem, id, user_id))
  }

  const handleDeleteCartItem = async(e) => {
    e.preventDefault();
    dispatch(deleteCartItem(item.id, user_id));
    // dispatch(clearCartItems())

  }


  return (
    <div className="each-cart-item-container">

      <div className="cart-item-header">
        {getProductTitle(item.product_id)}
      </div>
      {
        item.id?
        <>
        <form>
          <div className="cart-item-menu">

            <label>
                <input
                  className="cart-item"
                  type="number"
                  placeholder="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                /> 
            </label>

            <button
            className="cart-item-button"
              onClick={handleIncreaseQuantity}
            >
              <i class="fas fa-plus-square"></i>
            </button>

            <button
            className="cart-item-button"
              onClick={handleDecreaseQuantity}
            >
              <i class="fas fa-minus-square"></i>
            </button>

            <button
              className="cart-item-button"
              onClick={handleDeleteCartItem}
            >
              <i class="fas fa-trash-alt"></i>
            </button>

          </div>
        </form>
        <hr></hr>
        </>

        : null
      }



      </div>
  )
}

export default CartItem;
