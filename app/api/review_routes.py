from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Review, db, User
from app.forms import ReviewForm
from flask_login import login_required, current_user

review_routes = Blueprint('review', __name__)

# post a review
@review_routes.route('/<int:product_id>/reviews', methods=['POST'])
def create_review(product_id):
  # print('backend', product_id)
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    review = Review()
    form.populate_obj(review)
    db.session.add(review)
    db.session.commit()
    print("review dict-------------", review.to_dict())
    return {"review":review.to_dict()}
  else:
    return "bad data"

# get all reviews for a product
# @review_routes.route('/<int:id>', methods=['GET'])
@review_routes.route('/<int:product_id>/reviews', methods=['GET'])
def get_review(product_id):
  reviews = Review.query.filter(Review.product_id == product_id).all()
  # print("all reviews", reviews)
  return {review.id: review.to_dict() for review in reviews}

# get review
# @review_routes.route('/<int:id>', methods=['GET'])
# def get_review(id):
#   review = Review.query.get(id)
#   if review:
#     review = review.to_dict()
#     return review
#   else:
#     return {'message':'Product not found.'}



@review_routes.route('/<int:product_id>/reviews/<int:id>', methods=['GET','PUT'])
def review_detail(id, product_id):
    review = Review.query.get(id)

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("review api-----------", form.data)
    # print("review api-??????----------", review.to_dict())

    if form.validate_on_submit():
      review.user_id = form.data['user_id']
      review.product_id = form.data['product_id']
      review.content = form.data['content']
      review.rating = form.data['rating']
      # form.populate_obj(request.data)
      # db.session.add(request.data)

      db.session.commit()
      # print("review api-!!!!!!!!!----------", review.to_dict())
      return review.to_dict()
    else:
      # print("request.json !!!!!!!!",request.json)
      # print(form.errors)
      return "bad data"


@review_routes.route('/<int:product_id>/reviews/<int:id>', methods=['GET', 'DELETE'])
@login_required
def delete_review(id, product_id):
    review = Review.query.get(id)
    print("current user-----------", current_user.to_dict())
    currentUser = current_user.to_dict()
    print("current userEdit-----------", currentUser['id'])
    print(" review-----------", review.user_id)
    if currentUser['id'] == review.user_id:
      db.session.delete(review)
      db.session.commit()
      return "deleted"
    else:
      print("not delted-------")
      return "401"
