from flask import Blueprint
from app.models import Category


category_routes = Blueprint('categories', __name__)


@category_routes.route('/')
def get_categories():
    categories = Category.query.all()
    print(categories)
    categories = {"k": "v"}
    return categories
