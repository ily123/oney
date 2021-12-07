const ONE_PRODUCT = 'products/ONE_PRODUCT';

//action creator
const loadProduct = (product) => ({
    type: ONE_PRODUCT,
    product
})

//thunk
export const getOneProduct = (id) => async (dispatch) => {
    const res = await fetch(`/api/products/${id}`)
    const product = await res.json()
    console.log("thunk", product)
    dispatch(loadProduct(product))
}

const initialState = {}
//reducer
const productsReducer = (state=initialState, action) => {
    switch(action.type){
        case ONE_PRODUCT : {
            const newState = {...state};
            newState[action.product.id] = action.product
            return newState
        }
        default :
            return state
    }
}

export default productsReducer
