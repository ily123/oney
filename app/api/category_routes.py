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
        return tree # tree is already a dictionary
    except Exception as error:
        message = error.__repr__()
        return {"errors": "category GET failed", "message": message}


@category_routes.route('/<int:category_id>/products/')
def get_category_products(category_id):
    """Returns products associated with a category."""
    try:
        # our category structure is only 2 levels deep
        # so in the request you will either recieve an id for a
        # child category, in which case return items belonging to that child
        # or a parent category, in which case collect all of its CHILDREN ids first,
        # and return all items belonging to the children
        categories = Category.query.all()
        root = Category.convert_list_to_tree(categories)
        parent_categories = dict([(child.id, child) for child in root.children])
        if category_id in parent_categories.keys():
            parent = parent_categories[category_id]
            query_categories = [int(child.id) for child in parent.children]
        else:
            query_categories = [category_id]
        # find products using "WHERE category_id in (x, y, z)" query
        products = Product.query.filter(Product.category_id.in_(query_categories)).all()
        if products:
            # normalize as id->product dict before sending
            products = dict([(p.id, p.to_dict()) for p in products])
            return products
        return {}
    except Exception as error:
        message = error.__repr__()
        return {"errors": "category/products GET failed", "message": message}
