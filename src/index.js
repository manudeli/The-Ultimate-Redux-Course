import configureStore from "./store/configureStore";
import { loadBugs, resolveBug } from "./store/bugs";

const store = configureStore();
// UI Layer

store.dispatch(loadBugs());

setTimeout(() => store.dispatch(resolveBug(1)), 2000);
