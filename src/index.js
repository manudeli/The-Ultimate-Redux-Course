import store from "./store";
import * as actions from "./actionType";

// state = reducer(state, action);
// notify the subscribers

store.dispatch({
  type: actions.BUG_ADDED,
  payload: { description: "Bug1" },
});

store.dispatch({
  type: actions.BUG_REMOVED,
  payload: { id: 1 },
});

console.log(store.getState());
