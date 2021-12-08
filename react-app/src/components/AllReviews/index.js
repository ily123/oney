import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import { useParams} from 'react-router-dom';
import { getReviews } from "../../store/review";
import DotDotButton from "../DotDotButton";
import './AllReviews.css';


const AllReviews = ({product}) => {
  const dispatch = useDispatch()
  const reviewsObject = useSelector((state)=>state?.review)
  const reviews = Object?.values(reviewsObject)


  const sessionUser = useSelector((state) => state.session);

  // console.log("sessionUser", sessionUser?.user.username)
  // const username = sessionUser?.user.username

  // const {productId} = useParams()

  // console.log("all reviews", reviews)

  let product_id = product[0]?.id
  // console.log("product_id in all reviews", product[0]?.id)

  // console.log("product_id", product_id)
    useEffect(()=>{
        dispatch(getReviews(product_id))
    }, [dispatch, reviews.length, product_id])

    // console.log("user_id", user_id)

      const [users, setUsers] = useState([]);

      useEffect(() => {
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData();
      }, []);

      // console.log("users map", users)

      let user_id;
      if(sessionUser) {
        user_id = sessionUser?.user?.id
      } else {
        return null
      }

      const getUserName = (user_id) => {
        const usernameDisplay = users?.filter(function(el){
          return el.id === user_id
         });
        //  console.log("try", user_id)
        //  console.log("tryThis", usernameDisplay[0].username)
        if (usernameDisplay) {
         return usernameDisplay[0]?.username
        }
        else {
          return null
        }
      }

    return(
    <div>
        {
          reviews.map((review) =>
          <div className="review-container" key={review.id}>

            <div className="userIcon-username-date">
              <div className="review-padding">
                <i className="fas fa-user-circle fa-2x"></i>
              </div>

              <div className="review-padding">
                {
                  getUserName(review.user_id)
                }
              </div>

              <div>
                {review.created_at}
              </div>
            </div>

            <div className="star-dot-dot">

              <div>
                  {Array(review.rating).fill(
                  <span className="star-color-blue"><i className="fas fa-star fa-xs"></i></span>).map((ele, idx) => <span key={idx}>{ele}</span>)}
              </div>

              <div>
                {
                  user_id === review.user_id?
                <DotDotButton product_id={product_id} id={review?.id}/>
                :
                null
                }
              </div>

            </div>
            {review.content}
          </div>
          )
        }
    </div>
  )
}

export default AllReviews
