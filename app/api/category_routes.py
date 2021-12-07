from flask import Blueprint
from app.models import Category
import json


category_routes = Blueprint('categories', __name__)


@category_routes.route('/')
def get_categories():
    """Returns category tree."""
    categories = Category.query.all()
    tree = Category.convert_list_to_tree2(categories)
    return tree
