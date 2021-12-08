from flask import Blueprint
from app.models import Category
from app.models import Product
import json


category_routes = Blueprint('categories', __name__)


@category_routes.route('/')
def get_categories():
    """Returns category tree."""
    try:
        categories = Category.query.all()
        tree = Category.convert_list_to_tree(categories)
        return tree
    except Exception as error:
        message = error.__repr__()
        return {"errors": "category GET failed", "message": message}


@category_routes.route('/<int:category_id>/products/')
def get_category_products(category_id):
    """Returns products associated with a category."""
    try:
        # for reference: https://stackoverflow.com/questions/8603088/sqlalchemy-in-clause
        products = Product.query.filter(Product.category_id == category_id).all()
        if products:
            products = [p.to_dict() for p in products]
            return {"products": products}
        return {}
    except Exception as error:
        message = error.__repr__()
        return {"errors": "category/products GET failed", "message": message}
