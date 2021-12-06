from app.models import db, Product
import json


MOCK_PRODUCT_FP = "./app/seeds/mock_data/top_items.json"


def load_mock_data():
    """Loads mock category json data as python dict."""
    with open(MOCK_PRODUCT_FP) as file:
        products = json.load(file)
    return products


def seed_products():
    """Seeds Etsy mock categories."""
    mock_data = load_mock_data()
    for mock_prod in mock_data:
      new_prod = Product(
        title=mock_prod["title"],
        description=mock_prod["description"],
        price=float(mock_prod["price"]) if mock_prod["price"] else 0.0,
        category_id=mock_prod["category_id"],
        images=mock_prod["images"],
        num_favorers=mock_prod["num_favorers"],
        user_id=1
      )
      db.session.add(new_prod)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
