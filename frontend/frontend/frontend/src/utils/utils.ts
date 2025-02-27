import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that combines clsx and tailwind-merge
 * for handling conditional class names in a clean way
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
