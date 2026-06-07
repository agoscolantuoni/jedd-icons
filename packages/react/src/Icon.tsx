"use client";

import { resolveStrokeWidth, variantDefaultsCamel } from "@jedd-icons/shared";
import { createElement, forwardRef, type ReactNode } from "react";
import type { IconNode, IconNodeChild, IconProps, Variant } from "./types";

interface InternalProps extends IconProps {
  iconNode: IconNode;
  variant?: Variant;
}

const Icon = forwardRef<SVGSVGElement, InternalProps>(
  (
    {
      iconNode,
      variant = "stroke",
      size = 24,
      color = "currentColor",
      strokeWidth = 2,
      absoluteStrokeWidth = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const defaults = variantDefaultsCamel[variant];

    const hasA11y =
      "aria-label" in rest || "aria-labelledby" in rest || "role" in rest;

    const svgProps: Record<string, unknown> = {
      ref,
      ...defaults,
      width: size,
      height: size,
      className,
      ...(children || hasA11y ? {} : { "aria-hidden": true }),
    };

    if (variant === "stroke") {
      svgProps.stroke = color;
      svgProps.strokeWidth = resolveStrokeWidth(
        strokeWidth,
        size,
        absoluteStrokeWidth
      );
    } else {
      svgProps.fill = color;
    }

    return createElement("svg", { ...svgProps, ...rest }, [
      ...iconNode.map(function renderNode(
        [tag, attrs, nested]: IconNodeChild,
        i: number
      ): React.ReactElement {
        return createElement(
          tag,
          { key: `c-${i}`, ...attrs },
          ...(nested?.map(renderNode) ?? [])
        );
      }),
      ...((Array.isArray(children) ? children : [children]).filter(
        Boolean
      ) as ReactNode[]),
    ]);
  }
);

Icon.displayName = "Icon";

export default Icon;
