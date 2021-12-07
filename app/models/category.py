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

    # to be consumed by React category component
    @staticmethod
    def convert_list_to_tree(categories):
        """Converts category list into tree."""
        # initialize empty root node
        root = TreeNodeHelper()
        # convert categories to nodes, and put nodes into a helper dict
        categ_nodes = dict([(cat.id, TreeNodeHelper(cat)) for cat in categories])
        # go through each category, and link respective child/parent nodes
        while categories:
            child = categories.pop()
            parent_id = child.parent
            if parent_id:
                parent = categ_nodes[parent_id]
                parent.children.append(categ_nodes[child.id])
            else:
                # a category that doesn't have a parent gets assigned to root
                root.children.append(categ_nodes[child.id])
        return root


class TreeNodeHelper(dict):
    """Serializable node representation of a category."""
    # https://stackoverflow.com/questions/23595801/how-to-serialize-a-tree-class-object-structure-into-json-file-format
    def __init__(self, category=None, children=None):
        super().__init__()
        self.__dict__ = self
        if category:
            self.id = category.id
            self.page_tile = category.page_title
            self.page_description = category.page_description
            self.short_name = category.short_name
            self.parent_id = category.parent
        else:
            self.id = None
            self.short_name = "root"
        self.children = list(children) if children is not None else []
