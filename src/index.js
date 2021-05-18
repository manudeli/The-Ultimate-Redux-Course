import configureStore from "./store/configureStore";
import { addBug } from "./store/bugs";

const store = configureStore();
// UI Layer
store.dispatch(addBug({ description: "a" }));
