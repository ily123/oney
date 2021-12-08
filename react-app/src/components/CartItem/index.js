import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { removeFromCart, addToCart, decrement, updateCount } from '../../store/cart';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(item.count);

  useEffect(() => {
    setCount(item.count);
  }, [item.count]);

  return (
    <li className="cart-item">
      <div className="cart-item-header">
        {item.title}
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
