const SEARCH_PRODUCT = 'search/SEARCH_PRODUCT'

export const searchProduct = (products) => ({
    type: SEARCH_PRODUCT,
    products
})

export const search = (text) => async(dispatch) => {
    const response = await fetch(`/api/products/search?query=${text}`)
    if (response.ok) {
        const searchResults = await response.json();
        dispatch(searchProduct(searchResults))
        return searchResults
    }
}

const searchReducer = (state={}, action) => {
    switch(action.type){
        case SEARCH_PRODUCT:{
            const newState = action.products
            return newState
        }
        default:
            return state
    }
}

export default searchReducer
