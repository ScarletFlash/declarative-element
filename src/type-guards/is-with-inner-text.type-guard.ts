import type { WithInnerText } from "../declarations/traits/with-inner-text.trait";
import { isObject } from "./is-object.type-guard";

export function isWithInnerText<T>(
  input: T
): input is Required<WithInnerText<T>> {
  if (!isObject(input)) {
    return false;
  }

  const targetKey: keyof WithInnerText = "innerText";
  return targetKey in input && typeof input[targetKey] === "string";
}
