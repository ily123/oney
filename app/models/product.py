from .db import db
from sqlalchemy.sql import func


class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=True)
    images = db.Column(db.JSON, nullable=False)
    handmade = db.Column(db.Boolean, default=False)
    num_favorers = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    category = db.relationship("Category", back_populates="products")
    user = db.relationship("User", back_populates="products")
    reviews = db.relationship("Review", back_populates="product")
    cart = db.relationship("Cart", back_populates="products")

    def to_dict(self):
      return {
          'id': self.id,
          'title': self.title,
          'description': self.description,
          'price': self.price,
          'category_id': self.category_id,
          'images': self.images,
          'handmade': self.handmade,
          'num_favorers': self.num_favorers,
          'user_id': self.user_id,
          'created_at': self.created_at,
          'updated_at': self.updated_at
      }
