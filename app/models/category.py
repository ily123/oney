from .db import db
from sqlalchemy.sql import func
import json


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    page_title = db.Column(db.String, nullable=False)
    page_description = db.Column(db.Text, nullable=False)
    short_name = db.Column(db.String,nullable=False)
    parent= db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # 1 category has many products
    products = db.relationship("Product", back_populates="category")

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

    def __str__(self):
        """Returns category as a JSON string."""
        return json.dumps(self.to_dict(), indent=4, default=str)

    def __repr__(self):
        """Returns short string description of the category."""
        return "<Category {id} {name}>".format(id=self.id, name=self.short_name)

    @staticmethod
    def convert_list_to_dict(categories):
        """Normalizes list of categories as a dictionary."""
        return dict([(cat.id, cat) for cat in categories])

    @staticmethod
    def convert_list_to_tree(categories):
        """Convert category list into tree."""
        root = []
        categ_dict = self.convert_list_to_dict(categories)
        while categories:
            child = categories.pop()
            parent_id = child.parent
            if parent_id:
                parent = categ_dict[parent_id]
                try:
                    parent.children.append(child)
                except AttributeError:
                    parent.children = [child]
            else:
                root.append(child)
        return root
