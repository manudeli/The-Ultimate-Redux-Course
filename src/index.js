import store from "./store";
import { bugAdded } from "./actions";

// state = reducer(state, action);
// notify the subscribers

store.dispatch(bugAdded("Bug 1"));

console.log(store.getState());
