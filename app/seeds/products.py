from app.models import db, Category
import json


MOCK_CATEGORY_FP = "./app/seeds/mock_data/top_items_categories.json"


def load_mock_data():
    """Loads mock category json data as python dict."""
    with open(MOCK_CATEGORY_FP) as file:
        categories = json.load(file)
    return categories


def seed_categories():
    """Seeds Etsy mock categories."""
    mock_data = load_mock_data()
    for mock_categ in mock_data:
        # new_categ = Category(
        #     id=mock_categ["category_id"],
        #     page_title=mock_categ["page_title"] if mock_categ["page_title"] else "NAN",
        #     short_name=mock_categ["short_name"],
        #     page_description=mock_categ["page_description"] if mock_categ["page_description"] else "NAN",
        #     parent=mock_categ["parent"]
        # )
        db.session.add(new_categ)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
