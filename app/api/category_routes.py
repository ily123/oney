from flask import Blueprint
from app.models import Category
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
        return {"error": "category GET failed", "message": message}
