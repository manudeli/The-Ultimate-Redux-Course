import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug, getUnresolvedBugs, loadBugs, resolveBug } from "../bugs";
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

  // First of all, Write plan all about test before coding
  /* *** loading bugs
    - if they exist in the cache
        * they should come from the cache
    - if they don't exist in the cache
        * they should be fetched from the server
        - loading indicator
            * should be true while fetching
            * should be false after bugs are fetched
            * should be false if the server fails
  */

  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("they should not be fetched from the server again", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });
    describe("if the bugs don't exist in the cache", () => {
      it("they should be fetched from the server and put in the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(1);
      });

      describe("loading indicator", () => {
        it("should be true while fetching the bugs", () => {
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugsSlice().loading.toBe(true));
            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });

        it("should be false after the bugs are fetched", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });

        it("should be false if the server returns an error", async () => {
          fakeAxios.onGet("/bugs").reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });

  it("should mark the bug as resolved if it's saved to the server", async () => {
    fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("should not mark the bug as resolved if it's not saved to the server", async () => {
    fakeAxios.onPatch("/bugs/1").reply(500, { id: 1, resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).not.toBe(true);
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
