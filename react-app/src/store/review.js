const LOAD_REVIEWS = "review/LOAD_REVIEWS";
const ADD_ONE = "review/ADD_ONE"
const EDIT_ONE_REVIEW = "review/EDIT_ONE_REVIEW"
const REMOVE_REVIEW = "review/REMOVE_REVIEW"


// action creator to delete on review
const removeOneReview = (id) => ({
  type: REMOVE_REVIEW,
  id
})


// action create one review
const addOneReview = (newReview) => ({
  type: ADD_ONE,
  newReview
})

// action creator to edit one review
export const editReviewAction = (review, reviewId) => ({
  type: EDIT_ONE_REVIEW,
  review,
  reviewId
})


// action creator load all reviews
const loadAllReviews = (reviews, product_id) => ({
  type: LOAD_REVIEWS,
  reviews,
  product_id,
});


// thunk to delete a review
export const deleteReview = (product_id, id) => async dispatch => {
  const response = await fetch(`/api/products/${product_id}/reviews/${id}`, {
    method: 'DELETE',
  });
  // const res = await response.json()
  // console.log("delete review thunk", res)
  // console.log("delete review thunk", response)
  if(response.ok) {
    dispatch(removeOneReview(id))
    console.log(response)
  }
};


// thunk for creating a review
export const createOneReview = (formData, product_id) => async (dispatch) => {
  // console.log("createOneReview productId", product_id)
  const response = await fetch(`/api/products/${product_id}/reviews`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(
      formData
    )
  });
  try {
    const newReview = await response.json();
    dispatch(addOneReview(newReview))
    return newReview

  } catch(error) {
    console.log(error)
  }

}

//thunk for editing a review
export const editOneReview = (editReview,product_id, id) => async dispatch => {
  const response = await fetch(`/api/products/${product_id}/reviews/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify(editReview)
  });
  // console.log("editReview", editReview)
  // console.log('response in the thunk editOneReview', response)

  const review = await response.json();
  dispatch(editReviewAction(review, id))
  return review
}


// thunk for getting all reviews
export const getReviews = (product_id) => async(dispatch) => {
  if (product_id) {
    // console.log("thunk product id", product_id)
    const res = await fetch(`/api/products/${product_id}/reviews`)
    const reviews = await res.json();
    // console.log("reviews res.json()", reviews)
    dispatch(loadAllReviews(reviews, product_id))

  }
}


// reducer
const initialState = {};
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const newState = {...state};
      // console.log("reducer review", action.reviews)
      for (const[key,value] of Object.entries(action.reviews)) {
        newState[key] = value
      }
      // console.log("newState LOAD_REVIEWS", newState)
      return newState
    }
    case ADD_ONE : {
      // console.log("add_one case", action.newReview)
      if(!state[action.newReview.id]) {
        const newState = {
          ...state,
          [action.newReview.review.id]: action.newReview.review
          // because youre sending a key value pair back from the backend, return {"review":review.to_dict()}  when you dispatch that action.newReview is that key value pair.  needing to be dotted into one further
        }
        return newState
      }
      // return state
    }
    case EDIT_ONE_REVIEW: {
      if(!state[action.review]) {
        const newState = {
          ...state, [action.review.id]: action.review
        };
        // console.log("this is newState", newState)

        return newState
      }
      return state
    }

    case REMOVE_REVIEW : {
      const newState = {...state};
      delete newState[action.id];
      return newState
    }

    default:
      return state;
  }
}

export default reviewReducer
