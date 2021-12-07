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


@product_routes.route('/top20',methods=['GET'])
def get_top20_products():
  products = Product.query.filter(Product.num_favorers > 7000).limit(18).all()
  if products:
    products = {p.id : p.to_dict() for p in products}
    return products
  else:
    return {'message': 'Top20 Products not found'}
