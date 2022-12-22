import type { WithAttributes } from "../declarations/traits/with-attributes.trait";
import { isObject } from "./is-object.type-guard";

export function isWithAttributes(
  input: unknown
): input is Required<WithAttributes> {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithAttributes = "attributes";
  return targetKey in input && isObject(input[targetKey]);
}
