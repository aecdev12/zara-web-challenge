import purgeUndefinedValueFromObject from "@/utils/purgeUndefinedValuesFromObject";
import "@testing-library/jest-dom";

describe("purgeUndefinedValueFromObject", () => {
  let testObject: Record<string, unknown>;

  beforeEach(() => {
    testObject = {
      name: "John Doe",
      age: null,
      city: "",
      country: undefined,
      isActive: false,
      score: 0,
    };
  });

  it("removes undefined and null properties from the object, but keeps other falsy values", () => {
    const result = purgeUndefinedValueFromObject(testObject);

    expect(result).toEqual({
      name: "John Doe",
      city: "",
      isActive: false,
      score: 0,
    });
  });

  it("does not remove falsy values such as empty string, zero, or boolean false", () => {
    const alteredObject = {
      sampleText: "",
      zeroValue: 0,
      booleanFalse: false,
    };

    const result = purgeUndefinedValueFromObject(alteredObject);

    expect(result).toEqual({
      sampleText: "",
      zeroValue: 0,
      booleanFalse: false,
    });
  });

  it("maintains reference to the original object (mutates the object directly)", () => {
    const result = purgeUndefinedValueFromObject(testObject);

    expect(result).toBe(testObject);
  });

  it("returns an unchanged object if no properties are undefined or null", () => {
    const noUndefinedObject = {
      validName: "Alice",
      validScore: 10,
      validCity: "New York",
    };

    const result = purgeUndefinedValueFromObject(noUndefinedObject);

    expect(result).toEqual({
      validName: "Alice",
      validScore: 10,
      validCity: "New York",
    });
  });
});
