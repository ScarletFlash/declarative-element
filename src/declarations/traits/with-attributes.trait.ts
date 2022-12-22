export type WithAttributes<T = unknown> = T & {
  attributes: Record<string, string>;
};
