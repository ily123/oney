const SET_CATEGORY_TREE = "category/SET_CATEGORY_TREE";
const SET_PRODUCTS = "category/UPDATE_PRODUCTS";

const setTree = (tree) => {
  return {
    type: SET_CATEGORY_TREE,
    tree
  }
}

const updateProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

export const fetchCategoryTree = () => async (dispatch) => {
  const response = await fetch('/api/categories/');
  if (response.ok) {
    const tree = await response.json()
    if (tree.errors) return
    dispatch(setTree(tree))
  }
}

export const fetchProductsForCategory = (categoryId) => async (dispatch) => {    
  const response = await fetch(`/api/categories/${categoryId}/products/`)                                            
  if (response.ok) {                                                                                                       
    const products = await response.json()                                                                                 
    if (products.errors) return
    dispatch(updateProducts(products))                                                                                        
  }                                                                                                                        
}

const initialState = {
  tree: null,
  products: null
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY_TREE: {
      const { tree } = action
      return { ...state, tree } 
    }
    case SET_PRODUCTS: {
      const { products } = action
      return { ...state, products: products }
    }
    default: {
      return state;
    }
  }
}
