import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from 'react-router';
import { getOneProduct } from '../../store/product';
import { editOneReview } from '../../store/review';

// will need to thread the review the user is passing in from the SingleBusinessPage component
const EditOneReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {productId} = useParams();
  const { id } = useParams();

    const review = useSelector((state) => state.review[id])

  const [rating, setRating] = useState(review?.rating);
  const [content, setContent] = useState(review?.content);
  const [errors, setErrors] = useState([]);

  // grab the user from state so a user doesn't have the manually input their data into the form
  // we automatically know who's submitting the form
  const sessionUser = useSelector((state) => state.session.user)
  const user_id = sessionUser.id


  useEffect(()=>{
    dispatch(getOneProduct(productId))
}, [dispatch, productId])



  // get all reviews
   let product_id = productId


      useEffect(() => {
        const validationErrors = [];
        if(!rating) validationErrors.push("Rating is required")
        if(rating > 5 || rating < 1) validationErrors.push("Rating must be between 1-5")
        if(!content) validationErrors.push("Please write a review!")

        setErrors(validationErrors)

      },[content,rating,product_id,user_id])



  const handleSubmit = async(e) => {
    e.preventDefault();

    const editReview = {
      content,rating,product_id,user_id
    }


    let editedReview = await dispatch(editOneReview(editReview, product_id, id))


    if(editedReview) {
      history.push(`/products/${productId}`)
    }

  }

  const handleCancelReviewFormClick = (e) => {
    e.preventDefault();
    history.push(`/products/${productId}`)
  }

  return (
  <>
    <div>
      <div>Edit Review</div>
    </div>
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
          <button className="submit-cancel-review-button" type="button" onClick={handleCancelReviewFormClick}>Cancel</button>
        </form>
    </>
  )

}


export default EditOneReview
