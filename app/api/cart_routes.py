from flask import Blueprint
from app.models import Cart, Product, User

import json

cart_routes = Blueprint("cart", __name__)

@cart_routes.route('/<int:user_id>/', methods=['GET'])
def get_cart_items(user_id):
  cartItems = Cart.query.filter(Cart.user_id == user_id).all()
  return {cartItem.id: cartItem.to_dict() for cartItem in cartItems}
