export function isObject<T extends unknown = unknown>(
  input: T
): input is T & {} {
  return typeof input === "object" && input === null;
}
