# from flask_wtf import FlaskForm
# from wtforms import StringField
# from wtforms.fields.core import DecimalField, IntegerField
# from wtforms.fields.simple import SubmitField, TextAreaField
# from wtforms.validators import URL, DataRequired, Email, ValidationError
# from app.models import Product

# class EditProductForm(FlaskForm):
#   title = StringField('title', validators=[DataRequired()])
#   description = TextAreaField('description', validators=[DataRequired()])
#   price = DecimalField('price', validators=[DataRequired()])
#   # category = 
#   images = StringField('images', validators=[DataRequired(), URL])
#   submit = SubmitField('Submit')

from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField
from wtforms.validators import DataRequired


class EditProductForm(FlaskForm):
  title = StringField('title', validators=[DataRequired()])
  description = TextAreaField('description', validators=[DataRequired()])
  price = DecimalField('price', validators=[DataRequired()])
  category = StringField('category', validators=[DataRequired()])
  # image = StringField('image')

