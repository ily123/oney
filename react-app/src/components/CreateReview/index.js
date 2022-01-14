import { useEffect, useState } from "react"
import { useDispatch} from 'react-redux';
import { createOneReview } from "../../store/review";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom';

// need to add hideForm and hideButton inside of SingleProductPage
const ReviewForm = ({hideForm, hideButton}) => {

  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();

  const {productId} = useParams();
  const product_id = productId

  const sessionUser = useSelector((state) => state.session);

  const user_id = sessionUser?.user.id

  useEffect(() => {
    const validationErrors = [];
    if(!rating) validationErrors.push("Rating is required")
    if(rating > 5 || rating < 1) validationErrors.push("Rating must be between 1-5")
    if(!content) validationErrors.push("Please write a review!")

    setErrors(validationErrors)

  },[content,rating,product_id,user_id])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newReview = {
      content,rating,product_id,user_id
    }


    let createdReview = await dispatch(createOneReview(newReview, product_id))

    if (createdReview) {
      hideForm();
    }
  }

  const handleCancelReviewFormClick = (e) => {
    e.preventDefault();
    hideForm();
    hideButton();
  }


  return (
    <>
        <form className="submit-review" onSubmit={handleSubmit}>

          <label>
              <input
                type="number"
                placeholder="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
              </input>
          </label>
          <label>
              <input
                placeholder="content"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              >
              </input>
          </label>

          <ul className="error">
          {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
          <span className="submit-review">
          <button className="submit-cancel-review-button" type="submit" disabled={errors.length>0} >Submit Review</button>
          </span>
          <span>
          <button className="submit-cancel-review-button" type="button" onClick={handleCancelReviewFormClick}>Cancel</button>
          </span>
        </form>
        </>
      )

    }


    export default ReviewForm
