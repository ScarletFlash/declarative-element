import type { WithTag } from "../declarations/traits/with-tag.trait";
import { isObject } from "./is-object.type-guard";

export function isWithTag<T extends object = object>(
  input: T
): input is Required<WithTag<T>> {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithTag = "tag";
  return targetKey in input && typeof input[targetKey] === "string";
}
