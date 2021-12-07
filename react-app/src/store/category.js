const SET_TREE = "dummy"

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
