import type { IconNode, IconNodeChild, Variant } from "@jedd-icons/shared";
import { resolveStrokeWidth, variantDefaults } from "@jedd-icons/shared";

const SVG_NS = "http://www.w3.org/2000/svg";

export interface CreateElementOptions {
  absoluteStrokeWidth?: boolean;
  attrs?: Record<string, string | number>;
  class?: string;
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  variant?: Variant;
}

export function createElement(
  iconNode: IconNode,
  {
    variant = "stroke",
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    absoluteStrokeWidth = false,
    class: className,
    attrs: extraAttrs,
  }: CreateElementOptions = {}
): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, "svg");
  const defaults = variantDefaults[variant];

  for (const [key, value] of Object.entries(defaults)) {
    svg.setAttribute(key, String(value));
  }

  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));

  if (variant === "stroke") {
    const resolved = resolveStrokeWidth(strokeWidth, size, absoluteStrokeWidth);
    svg.setAttribute("stroke", color);
    svg.setAttribute("stroke-width", String(resolved));
  } else {
    svg.setAttribute("fill", color);
  }

  if (className) {
    svg.setAttribute("class", className);
  }

  if (extraAttrs) {
    for (const [k, v] of Object.entries(extraAttrs)) {
      svg.setAttribute(k, String(v));
    }
  }

  function buildNode([tag, attrs, children]: IconNodeChild): SVGElement {
    const el = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, String(v));
    }
    if (children) {
      for (const child of children) {
        el.appendChild(buildNode(child));
      }
    }
    return el;
  }

  for (const child of iconNode) {
    svg.appendChild(buildNode(child));
  }

  return svg;
}
