from app.models import db, Review


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    for i in range(1,3000):
        review1 = Review(
            user_id=2, product_id = i, content="This is crazy good!", rating=5)
        review2 = Review(
            user_id=3, product_id = i, content="Meh, it's ok", rating=4)
        db.session.add(review1)
        db.session.add(review2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
