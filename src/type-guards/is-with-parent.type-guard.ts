import type { WithParent } from "../declarations/traits/with-parent.trait";
import { isObject } from "./is-object.type-guard";

export function isWithParent<T extends object = object>(
  input: T
): input is Required<WithParent<T>> {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithParent = "parent";
  return targetKey in input && input[targetKey] instanceof Element;
}
