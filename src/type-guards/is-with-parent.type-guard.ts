import type { WithParent } from "../declarations/traits/with-parent.trait";
import { isObject } from "./is-object.type-guard";

export function isWithParent(input: unknown): input is Required<WithParent> {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithParent = "parent";
  return targetKey in input && input[targetKey] instanceof Element;
}
