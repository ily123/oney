const ONE_PRODUCT = 'products/ONE_PRODUCT';
const TOP20_PRODUCTS = 'products/TOP20_PRODUCTS';
const ADD_PRODUCT = 'products/ADD_PORDUCTS';
const CLEAR = 'products/CLEAR'

//action creator
const loadProduct = (product) => ({
    type: ONE_PRODUCT,
    product
})

const getProducts = (products) => ({
    type: TOP20_PRODUCTS,
    products
})

const addProducts = payload => ({
    type: ADD_PRODUCT,
    payload
})

export const clearProducts = () => ({
    type: CLEAR
})

//thunk
export const getOneProduct = (id) => async (dispatch) => {
    const res = await fetch(`/api/products/${id}`)
    const product = await res.json()
    // console.log("thunk", product)
    dispatch(loadProduct(product))
}

export const getTop20Products = () => async (dispatch) => {
    const response = await fetch('/api/products/top20');
    if(response.ok){
        const products = await response.json();
        dispatch(getProducts(products))
    }
}

export const addOneProduct = (payload) => async(dispatch) => {
    const response = await fetch('/api/products/new',{
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(payload)
    })
    if(response.ok) {
        const newProduct = await response.json();
        dispatch(addProducts(newProduct))
        return newProduct;
    }
}

const initialState = {}
//reducer
const productsReducer = (state=initialState, action) => {
    switch(action.type){
        case ONE_PRODUCT : {
            const newState = {}
            newState[action.product.id] = action.product
            return newState
        }
        case TOP20_PRODUCTS : {
            const newState = action.products
            return newState
        }
        case ADD_PRODUCT:{
            const newState = {...state, [action.payload.id]:action.payload}
            return newState
        }
        case CLEAR:{
            return {}
        }
        default :
            return state
    }
}

export default productsReducer
