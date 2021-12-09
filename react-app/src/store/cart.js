export const getCartItems = (state) => {
  return Object.values(state.cart.order)
    .map(id => ({
      ...state.cart[id],
      ...state.product[id],
    }));
};

const ADD_TO_CART = 'cart/addToCart';
const REMOVE_FROM_CART = 'cart/removeFromCart';
const DECREMENT = 'cart/decrement';
const UPDATE_COUNT = 'cart/updateCount';
const PURCHASE = 'cart/purchase';
const OPEN_CART = 'cart/openCart';
const CLOSE_CART = 'cart/closeCart';
const LOAD_ALL_CART_ITEMS = 'cart/loadAllCartItems';


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

export const decrement = (id) => ({
  type: DECREMENT,
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
export const addToCartThunk = (formData, user_id) => async (dispatch) => {
  const response = await fetch(`/api/carts/${user_id}/items`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(
      formData
    )
  });
  try {
    const newCartItem = await response.json();
    console.log("newCartItem", newCartItem)
    dispatch(addToCart(newCartItem))
    return newCartItem

  } catch(error) {
    console.log(error)
  }

}


// thunk to decrement item in cart
// export const decrementItemQuantityCartThunk = (editItem, id, user_id) => async(dispatch) => {

//   const response = await fetch(`/api/carts/${user_id}/items/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type':'application/json'
//   },
//     body: JSON.stringify(editItem)
//   });

//   console.log("editItem in thunk", editItem)


//   const editedItem = await response.json();

//   console.log("editedItem in thunk", editedItem)
//   dispatch(editItemAction(editedItem, id))
//   return editedItem


// }


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
      const newState = {...state}
      const newCount = state[action.newCartItem.id]?.quantity ? state[action.newCartItem.id].quantity + 1 : 1;
      console.log("newCount?????x?????", newCount)
      const newOrder = state.order.includes(action.newCartItem.id) ? state.order : [ ...state.order, action.newCartItem.id ];
      console.log("newOrder", newOrder)
      newState.order = newOrder
      newState.showCart = true
      newState[action.newCartItem.id] = {
            id: action.newCartItem.id,
            count: newCount}
      return newState
      // return {
      //   ...state,
      //   order: newOrder,
      //   showCart: true,
      //   [action.id]: {
      //     id: action.id,
      //     count: newCount,
      //   },
      };

    case REMOVE_FROM_CART: {
      const index = state.order.indexOf(action.id);
      const newOrder = [ ...state.order.slice(0, index), ...state.order.slice(index + 1) ];

      const newState = { ...state, order: newOrder };
      delete newState[action.id];
      return newState;
    }
    case DECREMENT:
      if (state[action.id].count > 1) {
        const newCount = state[action.id].count - 1;
        return {
          ...state,
          [action.id]: {
            id: action.id,
            count: newCount,
          },
        };
      } else {
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
    case PURCHASE:
      return { order: [] };
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
    default:
      return state;
  }
}
