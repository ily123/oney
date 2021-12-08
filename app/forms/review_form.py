from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import Review


class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    product_id = IntegerField('user_id', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5, message='rating must be 1-5')])
