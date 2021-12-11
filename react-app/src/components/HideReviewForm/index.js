import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom';
import {getOneProduct} from '../../store/product'
import { getReviews } from '../../store/review';
import AllReviews from '../AllReviews'
import ReviewForm from '../CreateReview';


function HideReviewForm(){
    const dispatch = useDispatch()

    const [showReviewForm, setShowReviewForm] = useState(false)
    const [hideReviewButton, setHideReviewButton] = useState(false)

    const productObject = useSelector((state)=>state.product)
    const product = Object.values(productObject)
    const {productId} = useParams()


    const reviewsObj = useSelector((state) => state.review)
    const reviews = Object.values(reviewsObj)

    const sessionUser = useSelector((state) => state.session.user);
    const user_id = sessionUser?.id

    // console.log("user_id", user_id)

    useEffect(()=>{
        dispatch(getOneProduct(productId))
    }, [dispatch, productId])


    // hide create a review button
    useEffect(() => {
        setHideReviewButton(false)
    },[dispatch, reviews.length])

    //trying to hide review form
    useEffect(() => {
        setShowReviewForm(false)
    },[dispatch,productId])

    let product_id = productId

    useEffect(()=> {
        dispatch(getReviews(product_id))
      }, [dispatch,reviews.length, product_id])


    if(!reviews) {
      return null;
    }

    let writeReviewButton = null;

    if(user_id) {
      writeReviewButton = (
        !hideReviewButton &&
          <button className="add-review-button"
          onClick={() => {setShowReviewForm(true);  setHideReviewButton(true)
          }}>
          <i className="fas fa-star"></i>&nbsp;&nbsp;Write a Review &nbsp;&nbsp;<i className="fas fa-star"></i></button>
      )

    } else {
      return <AllReviews product={product}/>
    }


  let reviewContent = null;

    if(showReviewForm && reviews) {
      reviewContent = (
        <>
          <ReviewForm reviews={reviews} hideForm={() => setShowReviewForm(false)} hideButton={() => setHideReviewButton(false)}/>
        </>
      )
    }

    return(
      <>
        <div className="all-review-container">
          {writeReviewButton}
          <div>
          {reviewContent}
          <AllReviews product={product}/>
          </div>
        </div>
        </>
    )
}

export default  HideReviewForm
