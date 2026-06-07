export function resolveStrokeWidth(
  strokeWidth: number | string,
  size: number | string,
  absolute: boolean
): number | string {
  return absolute ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth;
}
