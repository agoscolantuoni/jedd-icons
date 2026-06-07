import type { SVGProps } from "react";

export type { IconNode, IconNodeChild, Variant } from "@jedd-icons/shared";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  absoluteStrokeWidth?: boolean;
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
}

export type JeddIcon = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;
