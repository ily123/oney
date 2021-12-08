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

export const addToCart = (id) => ({
  type: ADD_TO_CART,
  id,
});

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

export default function cartReducer(state = { order: [], showCart: false }, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const newState = {...state}
      const newCount = state[action.id]?.count ? state[action.id].count + 1 : 1;
      console.log("newCount??????????", newCount)
      const newOrder = state.order.includes(action.id) ? state.order : [ ...state.order, action.id ];
      console.log("newOrder", newOrder)
      newState.order = newOrder
      newState.showCart = true
      newState[action.id] = {
            id: action.id,
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
    default:
      return state;
  }
}
