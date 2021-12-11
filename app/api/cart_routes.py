from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Cart, Product, User, db
from app.forms import CartForm
from flask_login import login_required, current_user

cart_routes = Blueprint("cart", __name__)

# route to get all cart items
@cart_routes.route('/<int:user_id>', methods=['GET'])
def get_cart_items(user_id):
  print("user_id", user_id)
  cartItems = Cart.query.filter(Cart.user_id == user_id).all()
  # cartItems = db.session.query(Cart.id, Cart.user_id, Cart.product_id, Cart.quantity, Product.title).join(Cart).join(Product).filter(Cart.user_id == user_id).all()
  print("cartItems", cartItems)
  return {cartItem.id: cartItem.to_dict() for cartItem in cartItems}


# route to update cart item
@cart_routes.route('/<int:user_id>/items/<int:id>', methods=['GET','PUT'])
def cart_item_detail(user_id, id):
    cartItem = Cart.query.get(id)

    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("review api-----------", form.data)
    # print("review api-??????----------", review.to_dict())

    if form.validate_on_submit():
      cartItem.user_id = form.data['user_id']
      cartItem.product_id = form.data['product_id']
      cartItem.quantity = form.data['quantity']

      db.session.commit()
      print("cartItem api-!!!!!!!!!----------", cartItem.to_dict())
      return cartItem.to_dict()
    else:
      return "bad data"




# route to create new cart item
@cart_routes.route('/<int:user_id>/items', methods=['POST'])
def add_cart_item(user_id):
  form = CartForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    cart_item = Cart()
    form.populate_obj(cart_item)
    print("cart_item------------------", cart_item.to_dict())
    db.session.add(cart_item)
    db.session.commit()
    return {"cart_item":cart_item.to_dict()}
  else:
    return "bad data"


# route to delete an item from a cart
@cart_routes.route('/<int:user_id>/items/<int:id>', methods=['GET', 'DELETE'])
@login_required
def delete_cart_item(user_id, id):
    cartItem = Cart.query.get(id)
    currentUser = current_user.to_dict()
    print("current userEdit-----------", currentUser['id'])
    print(" review-----------", cartItem.user_id)
    if currentUser['id'] == cartItem.user_id:
      db.session.delete(cartItem)
      db.session.commit()
      return "deleted"
    else:
      print("not delted-------")
      return "401"
