import type { WithTag } from "../declarations/traits/with-tag.trait";
import { isObject } from "./is-object.type-guard";

export function isWithTag(input: unknown): input is Required<WithTag> {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithTag = "tag";
  return targetKey in input && typeof input[targetKey] === "string";
}
