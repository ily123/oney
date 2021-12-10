from flask import Blueprint
from sqlalchemy import func
from app.models import Category, Product
import json


category_routes = Blueprint('categories', __name__)


@category_routes.route('/')
def get_categories():
    """Returns category tree."""
    try:
        categories = Category.query.all()
        tree = Category.convert_list_to_tree(categories)
        product_counts = count_number_of_products_by_category()
        # attach product counts onto every category
        tree.populate_counts(product_counts)

        return tree # tree is already a dictionary
    except Exception as error:
        message = error.__repr__()
        return {"errors": "category GET failed", "message": message}

def count_number_of_products_by_category():
    """Groups products by category id and returns count."""
    count = Product.query \
        .with_entities(Product.category_id, func.count(Product.id)) \
        .group_by(Product.category_id).all()
    return dict(count)

@category_routes.route('/<int:category_id>/products/')
def get_category_products(category_id):
    """Returns all products associated with a category, including sub-categories."""
    try:
        # if the category has children, we need to include children in the search
        query_categories = get_category_ids_to_include_in_query(category_id)
        products = Product.query.filter(Product.category_id.in_(query_categories)).all()
        if products:
            products = dict([(p.id, p.to_dict()) for p in products])
            return products
        return {}
    except Exception as error:
        message = error.__repr__()
        return {"errors": "category/products GET failed", "message": message}


@category_routes.route('/<int:category_id>/products/page/<int:page_number>')
def get_category_products_paginated(category_id, page_number):
    """Returns 12 products from a given category, for the given page number."""
    try:
        PRODUCTS_PER_PAGE = 12
        query_categories = get_category_ids_to_include_in_query(category_id)
        products = Product.query \
            .filter(Product.category_id.in_(query_categories)) \
            .paginate(page_number, PRODUCTS_PER_PAGE, False).items
        if products:
            products = dict([(p.id, p.to_dict()) for p in products])
            return products
        return {}
    except Exception as error:
        message = error.__repr__()
        return {"errors": "category/products GET failed", "message": message}


def get_category_ids_to_include_in_query(category_id):
    """Given a category id, returns list of all children and self."""
    # our category structure is only 2 levels deep
    # so in the request you will either recieve an id for a
    # child category, in which case return items belonging to that child
    # or a parent category, in which case collect all of its CHILDREN ids first,
    # and return all items belonging to the children and the category itself
    # note: should have included children as a column in the db!
    categories = Category.query.all()
    root = Category.convert_list_to_tree(categories)
    parent_categories = dict([(child.id, child) for child in root.children])
    query_categories = [category_id]
    if category_id in parent_categories.keys():
        parent = parent_categories[category_id]
        query_categories.extend([int(child.id) for child in parent.children])
    return query_categories
