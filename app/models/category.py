from .db import db
from sqlalchemy.sql import func


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    page_title = db.Column(db.String, nullable=False)
    page_description = db.Column(db.Text, nullable=False)
    short_name = db.Column(db.String,nullable=False)
    parent= db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'page_title': self.page_title,
            'page_description': self.page_description,
            'short_name': self.short_name,
            'parent': self.parent,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }