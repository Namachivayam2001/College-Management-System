import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * @typedef {Object} AvatarProps
 * @property {string} [className]
 */

/**
 * A wrapper component for creating an avatar.
 * @param {AvatarProps} props
 */
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

/**
 * @typedef {Object} AvatarImageProps
 * @property {string} [className]
 */

/**
 * Renders the avatar image.
 * @param {AvatarImageProps} props
 */
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

/**
 * @typedef {Object} AvatarFallbackProps
 * @property {string} [className]
 */

/**
 * A fallback component to be rendered when the avatar image fails to load.
 * @param {AvatarFallbackProps} props
 */
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
