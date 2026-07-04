import { cn } from "@/lib/cn";
import { VARIANT_ICONS } from "@/lib/icons";

const CLOUD_ICONS = VARIANT_ICONS.stroke;

function createCloudSlots(count: number) {
  const occurrences = new Map<string, number>();

  return Array.from({ length: count }, (_, index) => {
    const icon = CLOUD_ICONS[index % CLOUD_ICONS.length];
    const occurrence = occurrences.get(icon.name) ?? 0;
    occurrences.set(icon.name, occurrence + 1);

    return {
      ...icon,
      key: `${icon.name}-${occurrence}`,
    };
  });
}

interface IconCloudProps {
  className?: string;
  count?: number;
  iconSize?: number;
}

export function IconCloud({
  count = 120,
  iconSize = 20,
  className,
}: IconCloudProps) {
  if (CLOUD_ICONS.length === 0) {
    return null;
  }

  const slots = createCloudSlots(count);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-muted-foreground/20",
        // Clear the center so the CTA stays readable; cloud shows toward the edges.
        "mask-[radial-gradient(ellipse_at_center,transparent_10%,black_80%)]",
        className
      )}
    >
      <div
        className="grid h-full w-full place-items-center gap-2"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${iconSize * 2}px, 1fr))`,
        }}
      >
        {slots.map(({ key, Component }) => (
          <Component key={key} size={iconSize} strokeWidth={1.5} />
        ))}
      </div>
    </div>
  );
}
