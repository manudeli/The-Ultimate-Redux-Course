function createStore() {
  let state;

  function getState() {
    return state;
  }

  return {
    getState,
  };
}

export default createStore();
