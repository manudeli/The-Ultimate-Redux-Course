import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug, getUnresolvedBugs } from "../bugs";
import configureStore from "../configureStore";

describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;

  const createState = () => ({
    entities: {
      bugs: {
        lists: [],
      },
    },
  });

  it("should add the bug to the store if it's saved to the server", async () => {
    // Three part of Tip for writing Clean code to unit test

    // 1. Arrange:: All the initialization code
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    // 2. Act:: The code for poking the system or triggering action
    await store.dispatch(addBug(bug));

    // 3. Assert:: The expectation code
    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add the bug to the store if it's not saved to the server", async () => {
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });

  describe("selectors", () => {
    it("getUnresolvedBugs", () => {
      // 1. Arrange
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      //  2. Act
      const result = getUnresolvedBugs(state);

      // 3. Assert
      expect(result).toHaveLength(2);
    });
  });
});
