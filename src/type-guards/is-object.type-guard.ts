export function isObject<T>(input: T): input is T & {} {
  return typeof input === "object" && input === null;
}
