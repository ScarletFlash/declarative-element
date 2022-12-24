export type WithAttributesTrait<T = unknown> = T & {
  attributes: Record<string, string>;
};
