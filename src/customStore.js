import reducer from "./reducer";

function createStore(reducer) {
  let state;

  function dispatch(action) {
    state = reducer(state, action);
  }

  function getState() {
    return state;
  }

  return { dispatch, getState };
}

export default createStore(reducer);
