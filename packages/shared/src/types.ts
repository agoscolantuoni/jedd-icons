export type IconNodeChild = [
  tag: string,
  attrs: Record<string, string | number>,
  children?: IconNodeChild[],
];
export type IconNode = IconNodeChild[];
export type { Variant } from "./defaultAttributes";
