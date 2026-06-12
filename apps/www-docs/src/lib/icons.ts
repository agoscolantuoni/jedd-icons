import type { JeddIcon } from "@jedd-icons/react";
import * as StrokeLib from "@jedd-icons/react";
import * as FillLib from "@jedd-icons/react/fill";

export type Variant = "stroke" | "fill";

// Non-icon exports of the package that must be filtered out.
const RESERVED = new Set(["Icon", "createJeddIcon", "defaultAttributes"]);

function extractIcons(lib: Record<string, unknown>) {
  return Object.entries(lib)
    .filter(
      ([name, value]) =>
        !RESERVED.has(name) && typeof value === "object" && value !== null
    )
    .map(([name, Component]) => ({ name, Component: Component as JeddIcon }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Sorted icon list per variant. Single source of truth for the gallery,
 *  individual icon pages, and the sitemap. */
export const VARIANT_ICONS: Record<
  Variant,
  { name: string; Component: JeddIcon }[]
> = {
  stroke: extractIcons(StrokeLib as unknown as Record<string, unknown>),
  fill: extractIcons(FillLib as unknown as Record<string, unknown>),
};

/** Name → component lookup per variant. */
export const VARIANT_MAPS: Record<Variant, Record<string, JeddIcon>> = {
  stroke: Object.fromEntries(
    VARIANT_ICONS.stroke.map(({ name, Component }) => [name, Component])
  ),
  fill: Object.fromEntries(
    VARIANT_ICONS.fill.map(({ name, Component }) => [name, Component])
  ),
};

/** Every unique icon name across all variants — used to enumerate /icons/* routes. */
export const ALL_ICON_NAMES = Array.from(
  new Set([
    ...VARIANT_ICONS.stroke.map((i) => i.name),
    ...VARIANT_ICONS.fill.map((i) => i.name),
  ])
).sort((a, b) => a.localeCompare(b));

/** PascalCase component name → spaced words: "ChevronRight" → "Chevron Right". */
export function humanizeIconName(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}

export interface SnippetOptions {
  absolute: boolean;
  color: string | null;
  name: string;
  size: number;
  strokeWidth: number;
  variant: Variant;
}

/** React (`@jedd-icons/react`) usage snippet for the gallery and icon pages. */
export function buildReactSnippet({
  name,
  variant,
  size,
  strokeWidth,
  absolute,
  color,
}: SnippetOptions): string {
  if (!name) {
    return "";
  }

  const importPath =
    variant === "stroke" ? "@jedd-icons/react" : `@jedd-icons/react/${variant}`;
  const importLine = `import { ${name} } from "${importPath}"`;
  const colorProp = color ? ` color="${color}"` : "";

  if (variant === "stroke") {
    const absoluteProp = absolute ? " absoluteStrokeWidth" : "";
    return `${importLine}\n\n<${name} size={${size}} strokeWidth={${strokeWidth}}${absoluteProp}${colorProp} />`;
  }

  return `${importLine}\n\n<${name} size={${size}}${colorProp} />`;
}

/** Vanilla (`@jedd-icons/core`) usage snippet using the `createElement` helper. */
export function buildVanillaSnippet({
  name,
  variant,
  size,
  strokeWidth,
  absolute,
  color,
}: SnippetOptions): string {
  if (!name) {
    return "";
  }

  // The core (vanilla) package exposes each icon as plain data plus a
  // `createElement(iconData, options)` helper. Fill icons live on `/core/fill`
  // and need `variant: "fill"`; stroke is the default and omits the option.
  const importPath =
    variant === "stroke" ? "@jedd-icons/core" : "@jedd-icons/core/fill";
  const importLine =
    variant === "stroke"
      ? `import { ${name}, createElement } from "${importPath}"`
      : `import { createElement } from "@jedd-icons/core"\nimport { ${name} } from "${importPath}"`;

  const options: string[] = [`size: ${size}`];
  if (variant === "stroke") {
    options.push(`strokeWidth: ${strokeWidth}`);
    if (absolute) {
      options.push("absoluteStrokeWidth: true");
    }
  } else {
    options.push(`variant: "fill"`);
  }
  if (color) {
    options.push(`color: "${color}"`);
  }

  const optionsBlock = options.map((o) => `  ${o},`).join("\n");
  return `${importLine}\n\nconst svg = createElement(${name}, {\n${optionsBlock}\n})\n\ndocument.body.appendChild(svg)`;
}
