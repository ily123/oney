const SET_CATEGORY_TREE = "category/SET_CATEGORY_TREE";
const SET_CATEGORIES = "category/SET_CATEGORIES";
const SET_PRODUCTS = "category/UPDATE_PRODUCTS";

const setTree = (tree) => {
  return {
    type: SET_CATEGORY_TREE,
    tree
  }
}

const setCategoriesNormalized = (tree) => {
  return {
    type: SET_CATEGORIES,
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
    dispatch(setCategoriesNormalized(tree))
  }
}

export const fetchProductsForCategory = (categoryId, pageNumber) => async (dispatch) => {    
  const response = await fetch(`/api/categories/${categoryId}/products/page/${pageNumber}`)                                            
  if (response.ok) {                                                                                                       
    const products = await response.json()                                                                                 
    if (products.errors) return
    dispatch(updateProducts(products))                                                                                        
  }                                                                                                                        
}

const initialState = {
  tree: null,
  flat: null,
  products: null
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY_TREE: {
      const { tree } = action
      return { ...state, tree } 
    }
    case SET_CATEGORIES: {
      const { tree } = action
      // normalize category tree into key-val object
      // this only works because there are just 2 levels 
      // update to bfs later, or normalize on the backend
      const flat = {}
      const queue = [tree]
      while (queue.length) {
        const category = queue.pop()
        flat[category.id] = category
        queue.push(...category.children)
      }
      return { ...state, flat }
    }
    case SET_PRODUCTS: {
      const { products } = action
      return { ...state, products }
    }
    default: {
      return state;
    }
  }
}
