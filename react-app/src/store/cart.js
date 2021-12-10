export const getCartItems = (state) => {
  return Object.values(state.cart.order)
    .map(id => ({
      ...state.cart[id],
      ...state.product[id],
    }));
};

const ADD_TO_CART = 'cart/addToCart';
const REMOVE_FROM_CART = 'cart/removeFromCart';
const UPDATE_COUNT = 'cart/updateCount';
const PURCHASE = 'cart/purchase';
const OPEN_CART = 'cart/openCart';
const CLOSE_CART = 'cart/closeCart';
const LOAD_ALL_CART_ITEMS = 'cart/loadAllCartItems';
const CLEAR = 'cart/CLEAR'
const PURCHASE_FROM_CART = 'cart/PURCHASE'

export const clearCartItems = () => ({
  type: CLEAR
})

// action creator to add to cart
export const addToCart = (newCartItem) => ({
  type: ADD_TO_CART,
  newCartItem,
});

// action creator to get all cart items
const loadAllCartItems = (cartItems, user_id) => ({
  type: LOAD_ALL_CART_ITEMS,
  cartItems,
  user_id
})

const editItemAction = (editedItem, id) => ({
  type: UPDATE_COUNT,
  payload: {
  editedItem,
  id
  }
})

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

export const purchaseFromCart = (id) => ({
  type: PURCHASE_FROM_CART,
  id,
});



export const updateCount = (id, count) => ({
  type: UPDATE_COUNT,
  id,
  count,
});

export const purchase = () => ({
  type: PURCHASE,
});

export const openCart = () => ({
  type: OPEN_CART,
});

export const closeCart = () => ({
  type: CLOSE_CART,
});

// thunk to add to cart
export const addToCartThunk = (item, user_id) => async (dispatch) => {
  const response = await fetch(`/api/carts/${user_id}/items`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(
      item
    )
  });
  console.log("item in thunk", item)
  console.log("user_id in thunk", user_id)

  try {
    const newCartItem = await response.json();
    console.log("newCartItem", newCartItem)
    dispatch(addToCart(newCartItem))

    console.log("newCartItem in thunk", newCartItem)
    return newCartItem

  } catch(error) {
    console.log(error)
  }

}

// thunk to remove an item in the cart completely
export const deleteCartItem = (id, user_id) => async(dispatch) => {

  console.log("hit delete thunk - item.id",id)

  if(id) {
  const response = await fetch(`/api/carts/${user_id}/items/${id}`, {
    method: 'DELETE',
  });


  if(response.ok) {
    dispatch(removeFromCart(id))
  }
} else {
  return null
}
}


export const purchaseCart = (id, user_id) => async(dispatch) => {

  console.log("hit delete thunk - item.id",id)

  if(id) {
  const response = await fetch(`/api/carts/${user_id}/items/${id}`, {
    method: 'DELETE',
  });


  if(response.ok) {
    dispatch(purchaseFromCart(id))
  }
} else {
  return null
}
}


// // thunk to purchase items -> aka delete all items from cart and db
// export const purchaseCart = (id, user_id) => async(dispatch) => {

//   console.log("hit delete all cart items / purchase  thunk")

//   const response = await fetch(`/api/carts/${user_id}/items/${id}`, {
//     method: 'DELETE',
//   });

//   if(response.ok) {
//     for(let i =0; i < cartItems.length; i++) {
//       dispatch(removeFromCart(cartItem.id))
//     }
//   }
// }


// takes care of deleting and adding existing quantity of item
// thunk to update cart // works!! :)
export const updateCartThunk = (editItem, id, user_id) => async(dispatch) => {

  const response = await fetch(`/api/carts/${user_id}/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify(editItem)
  });

  console.log("editItem in thunk", editItem)


  const editedItem = await response.json();

  console.log("editedItem in thunk", editedItem)
  dispatch(editItemAction(editedItem, id))
  return editedItem
}

// thunk to get all cart items
export const allCartItemsThunk = (user_id) => async(dispatch) => {

  if(user_id) {
    console.log("user_id in thunk", user_id)
    const res = await fetch(`/api/carts/${user_id}`)
    const cartItems = await res.json();
    console.log("allCartItemsThunk", cartItems)
    dispatch(loadAllCartItems(cartItems, user_id))
  }

}

export default function cartReducer(state = { order: [], showCart: false }, action) {
  switch (action.type) {
    case ADD_TO_CART: {


      if(!state[action.newCartItem.id]) {
        const newState = {
          ...state,
          [action.newCartItem.id]: action.newCartItem
        }
        newState.showCart = true
        console.log("newState in cart reducer add_to_cart", action.newCartItem.created_at)

        return newState
      }
    }

    // case ADD_TO_CART: {
    //   const newState = {...state}
    //   const newCount = state[action.newCartItem.id]?.quantity? state[action.newCartItem.id].quantity + 1 : 1;
    //   console.log("newCount?????x?????", newCount)
    //   const newOrder = state.order.includes(action.newCartItem.id) ? state.order : [ ...state.order, action.newCartItem.id ];
    //   console.log("newOrder", newOrder)
    //   newState.order = newOrder
    //   newState.showCart = true
    //   newState[action.newCartItem.id] = {
    //         id: action.newCartItem.id,
    //         count: newCount}
    //   console.log("newState in cart reducer for add_to_cart", newState)
    //   return newState
    //   // return {
    //   //   ...state,
    //   //   order: newOrder,
    //   //   showCart: true,
    //   //   [action.id]: {
    //   //     id: action.id,
    //   //     count: newCount,
    //   //   },
    //   };

    case REMOVE_FROM_CART: {
      const index = state.order.indexOf(action.id);
      const newOrder = [ ...state.order.slice(0, index), ...state.order.slice(index + 1) ];

      const newState = { ...state, order: newOrder };
      delete newState[action.id];
      return newState;
    }

    case UPDATE_COUNT:
      if (action.count > 0) {
        return {
          ...state,
          [action.id]: {
            id: action.id,
            count: action.count,
          },
        };
      } else {
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      }
    // case PURCHASE:
    //   const index = state.order.indexOf(action.id);
    //   const newOrder = [ ...state.order.slice(0, index), ...state.order.slice(index + 1) ];

    //   const newState = { ...state, order: newOrder };
    //   delete newState[action.id];
    //   return newState;
      // return { order: [] };
    case OPEN_CART:
      return {
        ...state,
        showCart: true,
      };
    case CLOSE_CART:
      return {
        ...state,
        showCart: false,
      };
    case LOAD_ALL_CART_ITEMS: {
      const newState = {...state};
      // console.log("reducer review", action.reviews)
      for (const[key,value] of Object.entries(action.cartItems)) {
        newState[key] = value
      }
      // console.log("newState LOAD_REVIEWS", newState)
      return newState
    };
    case CLEAR:{
      return {}
    };
    case PURCHASE_FROM_CART: {
      return {}
    };
    
    default:
      return state;
  }
}
