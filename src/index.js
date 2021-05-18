import configureStore from "./store/configureStore";

const store = configureStore();

store.dispatch({
  type: "apiCallBegan", // api Request,
  payload: {
    url: "/bugs",
    onSuccess: "bugsReceived",
    onError: "apiRequestFailed",
  },
});
