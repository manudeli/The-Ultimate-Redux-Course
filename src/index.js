import store from "./store";
import { bugAdded, bugResolved } from "./actions";

// state = reducer(state, action);
// notify the subscribers

store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugResolved(1));

console.log(store.getState());
