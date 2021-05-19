import { isEven } from "./math";

describe("isEven", () => {
  it("should return true if given an even number", () => {
    // Function under test (SUT::: System Under Test)
    const result = isEven(2);
    expect(result).toEqual(true);
  });

  it("should return false if given an odd number", () => {
    const result = isEven(1);
    expect(result).toEqual(false);
  });
});
