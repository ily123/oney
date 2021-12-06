
from app.models import db, Cart
import json


def seed_carts():
    """Seeds Etsy mock categories."""
    for i in range(1,6):
        mock_cart = Cart(
            user_id = 3,
            product_id = i,
            quantity = 1
        )
        db.session.add(mock_cart)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_carts():
    db.session.execute('TRUNCATE carts RESTART IDENTITY CASCADE;')
    db.session.commit()