from flask import Blueprint, jsonify
from app.models import Product

product_routes = Blueprint('product', __name__)

@product_routes.route('/<int:id>', methods=['GET'])
def get_product(id):
  product = Product.query.get(id)
  if product:
    product = product.to_dict()
    return product
  else:
    return {'message':'Product not found.'}

# @product_routes.route('/<int:id>/edit', methods=['GET','POST'])
# def update_product(id):
  # { description, images, price, title } = req.body