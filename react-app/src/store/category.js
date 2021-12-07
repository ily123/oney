const SET_CATEGORY_TREE = "category/SET_CATEGORY_TREE";

const setTree = (tree) => {
  return {
    type: SET_CATEGORY_TREE,
    tree
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

const initialState = {
  tree: null
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY_TREE: {
      const { tree } = action
      return { ...state, tree } 
    }
    default: {
      return state;
    }
  }
}
