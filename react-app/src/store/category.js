const SET_TREE = "category/SET_TREE";

const setTree = (tree) => {
  return {
    type: SET_TREE,
    tree
  }
}

export const fetchCategoryTree = () => async (dispatch) => {
  const response = await fetch('api/category/');
  if (response.ok) {
    const tree = await response.json()
    if (tree.errors) return
    console.log(tree)
    dispatch(setTree(tree))
  }
}

const initialState = {
  tree: null
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TREE: {
      return state
    }
    default: {
      return state;
    }
  }
}
