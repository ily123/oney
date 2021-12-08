from flask_wtf import FlaskForm
from wtforms import StringField,TextAreaField, DecimalField
# from wtforms.validators import DataRequired


class NewProductForm(FlaskForm):
    title = StringField('title')
    description = TextAreaField('description')
    price = DecimalField('price')
    category = StringField('category')
    image = StringField('image')
