import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { highlight } from "sugar-high";
import { cn } from "@/lib/cn";

interface CodeSnippetProps {
  className?: string;
  code: string;
  /**
   * Fixed height utility for the scroll box (e.g. "h-32"). Base UI's ScrollArea
   * needs a definite height; content scrolls within it. Defaults to "h-64".
   */
  heightClassName?: string;
}

/**
 * Lightweight syntax-highlighted code block with a copy button. Uses sugar-high
 * (~1KB, JS/TS/JSX) instead of Shiki, which avoids bundling hundreds of grammar
 * and theme chunks. Token colors come from the `--sh-*` CSS variables in app.css.
 */
export function CodeSnippet({
  code,
  className,
  heightClassName = "h-32",
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-border bg-muted/30 text-xs",
        className
      )}
    >
      <Button
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2 right-2 z-10"
        onClick={copy}
        size="icon-sm"
        type="button"
        variant="outline"
      >
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </Button>
      {/* Definite height so the ScrollArea Viewport's `h-full` resolves and
          content scrolls inside the box instead of overflowing it. */}
      <ScrollArea className={heightClassName}>
        <pre className="w-max min-w-full p-3 pr-12">
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: sugar-high returns sanitized highlight markup for our own generated snippets. */}
          <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
        </pre>
      </ScrollArea>
    </div>
  );
}
