import type { WithChildren } from "./../declarations/traits/with-children.trait";
import { isWithChildren } from "./is-with-children.type-guard";

describe("is-with-children.type-guard.ts", () => {
  it("should return false if called with primitive", () => {
    expect(isWithChildren(null)).toBeFalsy();
  });

  it("should return true if called with object compatible with { children: Node.Any[] }", () => {
    const compatibleObject: WithChildren = {
      children: [],
    };

    expect(isWithChildren(compatibleObject)).toBeTruthy();
  });

  it("should return false if called with object incompatible with { children: Node.Any[] }", () => {
    const incompatibleObject: Record<keyof WithChildren, VoidFunction> = {
      children: () => {},
    };

    expect(isWithChildren(incompatibleObject)).toBeFalsy();
  });
});
