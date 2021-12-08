from flask import Blueprint, jsonify
from app.models import Product, db

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

@product_routes.route('/<int:id>/delete', methods=['GET', 'DELETE'])
def delete_product(id):
  product = Product.query.get(id)
  db.session.delete(product)
  db.session.commit()
  return 'deleted'


@product_routes.route('/top20',methods=['GET'])
def get_top20_products():
  products = Product.query.filter(Product.num_favorers > 7000).limit(18).all()
  if products:
    products = {p.id : p.to_dict() for p in products}
    return products
  else:
    return {'message': 'Top20 Products not found'}
