from flask import Blueprint, jsonify, request
from app.forms import EditProductForm
from app.models import Product, db
from flask_login import current_user


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

@product_routes.route('/<int:id>/edit', methods=['GET','PUT'])
def update_product(id):
  currentUser = current_user.to_dict()
  form = EditProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  product = Product.query.get(id)
  print(form.validate_on_submit)
  print(form.data)
  if form.validate_on_submit():
    print('herrrrrrrrrreeeeee')
    product.title = form.data['title'],
    product.description = form.data['description'],
    product.price = form.data['price'],
    product.category_id = int(form.data['category'])
    # product.images = [{"url_75x75": form.data['image'],
    #                   "url_170x135": form.data['image'],
    #                   "url_570xN": form.data['image'],
    #                   "url_fullxfull": form.data['image']
    #                   }],
    # product.user_id = currentUser['id']

    db.session.commit()
    return product.to_dict()
  else:
    print('hello there!')
    print(form.errors)
    return 'Bad data'



@product_routes.route('/<int:id>/delete', methods=['GET', 'DELETE'])
def delete_product(id):
  product = Product.query.get(id)
  if product:
    db.session.delete(product)
    db.session.commit()
    return 'deleted'
  else:
    return '401'


# @product_routes.route('/<int:id>/delete', methods=['GET', 'DELETE'])
# def delete_product(id):
#   product = Product.query.get(id)
#   db.session.delete(product)
#   db.session.commit()
#   return 'deleted'
  
