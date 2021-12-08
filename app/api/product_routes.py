from flask import Blueprint, jsonify, request
from app.models import Product, db
from app.forms import NewProductForm
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

@product_routes.route('/new', methods=['POST'])
def add_new_product():
  currentUser = current_user.to_dict()
  form = NewProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  print(".................", request.cookies['csrf_token'])
  print("Hiiiiiiiiiiiiiiiiiiii",form.validate_on_submit())
  if form.validate_on_submit():
    product = Product(
      title = form.data['title'],
      description = form.data['description'],
      price = form.data['price'],
      category_id = int(form.data['category']),
      images = [{"url_75x75": form.data['image'],
                "url_170x135": form.data['image'],
                "url_570xN": form.data['image'],
                "url_fullxfull": form.data['image']
              }],
      user_id = currentUser['id']
    )
    db.session.add(product)
    db.session.commit()
    print("///////////////////", product.to_dict())
    return product.to_dict()
  else:
    return "Bad Data"
