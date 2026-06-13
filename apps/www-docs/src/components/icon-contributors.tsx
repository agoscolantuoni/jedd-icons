import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { cn } from "@/lib/cn";
import { githubAvatarUrl, githubProfileUrl } from "@/lib/shared";

interface IconContributorsProps {
  className?: string;
  contributors: string[];
}

/**
 * Overlapping avatar stack of an icon's GitHub contributors. Each avatar links
 * to that user's profile (new tab) and shows their username on hover. Renders
 * nothing when there are no contributors.
 */
export function IconContributors({
  contributors,
  className,
}: IconContributorsProps) {
  if (contributors.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center", className)}>
      <span className="sr-only">Contributors:</span>
      <ul className="flex items-center -space-x-1.5">
        {contributors.map((username) => (
          <li key={username}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    aria-label={`${username} on GitHub`}
                    className="block rounded-full ring-2 ring-background transition-transform hover:z-10 hover:scale-110 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-ring"
                    href={githubProfileUrl(username)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      alt={username}
                      className="size-6 rounded-full bg-muted"
                      height={24}
                      loading="lazy"
                      src={githubAvatarUrl(username)}
                      width={24}
                    />
                  </a>
                }
              />
              <TooltipContent side="bottom">@{username}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
}
