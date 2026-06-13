import { cn } from "@/lib/cn";
import type { IconRelease } from "@/lib/icons";
import { releaseUrl } from "@/lib/shared";

interface IconReleaseInfoProps {
  className?: string;
  release: IconRelease | null;
}

/**
 * "Added in vX" line for an icon, linking to that version's GitHub release in a
 * new tab. Renders nothing when there's no release data; shows "Unreleased" for
 * icons that exist in source but aren't in a tagged release yet.
 */
export function IconReleaseInfo({ release, className }: IconReleaseInfoProps) {
  if (!release) {
    return null;
  }

  if (release.unreleased) {
    return (
      <p className={cn("text-muted-foreground text-xs", className)}>
        Unreleased
      </p>
    );
  }

  const { version, date } = release.createdRelease;
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <p className={cn("text-muted-foreground text-xs", className)}>
      Added in{" "}
      <a
        className="font-medium text-foreground underline decoration-dotted underline-offset-2 hover:decoration-solid"
        href={releaseUrl(version)}
        rel="noopener noreferrer"
        target="_blank"
        title={`Released ${formattedDate} — view on GitHub`}
      >
        v{version}
      </a>
    </p>
  );
}
