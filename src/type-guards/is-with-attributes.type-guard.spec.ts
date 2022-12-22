import type { WithAttributes } from "./../declarations/traits/with-attributes.trait";
import { isWithAttributes } from "./is-with-attributes.type-guard";

describe("is-with-attributes.type-guard.ts", () => {
  it("should return false if called with primitive", () => {
    expect(isWithAttributes(null)).toBeFalsy();
  });

  it("should return true if called with object compatible with { attributes: Record<string, string> }", () => {
    const compatibleObject: WithAttributes = {
      attributes: { case: "compatible" },
    };

    expect(isWithAttributes(compatibleObject)).toBeTruthy();
  });

  it("should return false if called with object incompatible with { attributes: Record<string, string> }", () => {
    const incompatibleObject: Record<keyof WithAttributes, string> = {
      attributes: "incompatible",
    };

    expect(isWithAttributes(incompatibleObject)).toBeFalsy();
  });
});
