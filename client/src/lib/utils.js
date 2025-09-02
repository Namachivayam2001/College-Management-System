// This utility function is already JavaScript-compatible.
// The TypeScript syntax has been removed.

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to conditionally join class names and merge Tailwind CSS classes.
 * @param {...any} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
