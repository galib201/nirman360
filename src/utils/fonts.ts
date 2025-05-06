
/**
 * Font utility functions for consistent typography throughout the application
 */

import { cn } from "@/lib/utils";

/**
 * Heading style utility function
 * Use for main page headings and important section titles
 */
export function heading({
  size = "default",
  className,
}: {
  size?: "sm" | "default" | "lg" | "xl";
  className?: string;
} = {}) {
  return cn(
    "font-display font-semibold tracking-tight",
    {
      "text-2xl": size === "sm",
      "text-3xl md:text-4xl": size === "default",
      "text-4xl md:text-5xl": size === "lg",
      "text-5xl md:text-6xl": size === "xl",
    },
    className
  );
}

/**
 * Subheading style utility function
 * Use for section subtitles and card headers
 */
export function subheading({
  size = "default",
  className,
}: {
  size?: "sm" | "default" | "lg";
  className?: string;
} = {}) {
  return cn(
    "font-medium tracking-tight",
    {
      "text-lg": size === "sm",
      "text-xl": size === "default",
      "text-2xl": size === "lg",
    },
    className
  );
}

/**
 * Label style utility function
 * Use for form labels and small headings
 */
export function label({ className }: { className?: string } = {}) {
  return cn("text-sm font-medium leading-none", className);
}

/**
 * Paragraph style utility function
 * Use for regular text content
 */
export function paragraph({
  size = "default",
  className,
}: {
  size?: "sm" | "default" | "lg";
  className?: string;
} = {}) {
  return cn(
    "leading-relaxed",
    {
      "text-sm": size === "sm",
      "text-base": size === "default",
      "text-lg": size === "lg",
    },
    className
  );
}

/**
 * Caption style utility function
 * Use for small descriptive text, captions, and hints
 */
export function caption({ className }: { className?: string } = {}) {
  return cn("text-xs text-muted-foreground", className);
}

/**
 * Muted style utility function
 * Use for secondary text, hints, and less important information
 */
export function muted({ className }: { className?: string } = {}) {
  return cn("text-sm text-muted-foreground leading-relaxed", className);
}
