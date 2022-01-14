from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField
from wtforms.validators import DataRequired


class EditProductForm(FlaskForm):
  title = StringField('title', validators=[DataRequired()])
  description = TextAreaField('description', validators=[DataRequired()])
  price = DecimalField('price', validators=[DataRequired()])
  category = StringField('category', validators=[DataRequired()])
