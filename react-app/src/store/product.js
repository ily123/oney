const ONE_PRODUCT = 'products/ONE_PRODUCT';
const TOP20_PRODUCTS = 'products/TOP20_PRODUCTS'
const EDIT_PRODUCT = 'product/EDIT_PRODUCT'
const DELETE_ONE_PRODUCT = 'products/DELETE_ONE_PRODUCT'

//action creator
const loadProduct = (product) => ({
    type: ONE_PRODUCT,
    product
})

const getProducts = (products) => ({
    type: TOP20_PRODUCTS,
    products
})

const editOneProduct = (product, productId) => ({
    type: EDIT_PRODUCT,
    product,
    productId
})

const deleteAProduct = (product) => ({
    type: DELETE_ONE_PRODUCT,
    product
})

//thunk
export const getOneProduct = (id) => async (dispatch) => {
    const res = await fetch(`/api/products/${id}`)
    const product = await res.json()
    console.log("thunk", product)
    dispatch(loadProduct(product))
}

export const getTop20Products = () => async (dispatch) => {
    const response = await fetch('/api/products/top20');
    if(response.ok){
        const products = await response.json();
        dispatch(getProducts(products))
    }
}

export const editAProduct = (productToEdit, id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(productToEdit)
    });

    const product = await response.json();
    dispatch(editOneProduct(product, id));
    return product;
}

export const deleteProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/delete`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteAProduct(productId))
    }
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
        case TOP20_PRODUCTS : {
            const newState = action.products
            return newState
        }
        case EDIT_PRODUCT : {
            if (!state[action.product]) {
                const newState = {
                    ...state, [action.product.id]: action.product
                }
                
                return newState
            }

            return state
        }
        case DELETE_ONE_PRODUCT : {
            const newState = {...state};
            delete newState[action.product];
            return newState;
        }
        default :
            return state
    }
}

export default productsReducer
