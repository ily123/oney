from flask import Blueprint
from app.models import Cart, Product, User

import json

cart_routes = Blueprint("cart", __name__)

# route to get all cart items
@cart_routes.route('/<int:user_id>', methods=['GET'])
def get_cart_items(user_id):
  print("user_id", user_id)
  cartItems = Cart.query.filter(Cart.user_id == user_id).all()
  # cartItems = db.session.query(Cart.id, Cart.user_id, Cart.product_id, Cart.quantity, Product.title).join(Cart).join(Product).filter(Cart.user_id == user_id).all()
  print("cartItems", cartItems)
  return {cartItem.id: cartItem.to_dict() for cartItem in cartItems}
