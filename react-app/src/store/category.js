const SET_TREE = "category/SET_TREE";

const setTree = (tree) => {
  return {
    type: SET_TREE,
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
    case SET_TREE: {
      const { tree } = action
      return { ...state, tree } 
    }
    default: {
      return state;
    }
  }
}
