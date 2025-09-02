import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * @typedef {Object} CardProps
 * @property {string} [className]
 */

/**
 * A container component for grouping related content.
 * @param {CardProps & React.HTMLAttributes<HTMLDivElement>} props
 */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * @typedef {Object} CardHeaderProps
 * @property {string} [className]
 */

/**
 * A component to display the header of the card.
 * @param {CardHeaderProps & React.HTMLAttributes<HTMLDivElement>} props
 */
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * @typedef {Object} CardTitleProps
 * @property {string} [className]
 */

/**
 * A component for the title of the card.
 * @param {CardTitleProps & React.HTMLAttributes<HTMLHeadingElement>} props
 */
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * @typedef {Object} CardDescriptionProps
 * @property {string} [className]
 */

/**
 * A component for the description text in the card.
 * @param {CardDescriptionProps & React.HTMLAttributes<HTMLParagraphElement>} props
 */
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * @typedef {Object} CardContentProps
 * @property {string} [className]
 */

/**
 * A container for the main content of the card.
 * @param {CardContentProps & React.HTMLAttributes<HTMLDivElement>} props
 */
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * @typedef {Object} CardFooterProps
 * @property {string} [className]
 */

/**
 * A component for the footer section of the card.
 * @param {CardFooterProps & React.HTMLAttributes<HTMLDivElement>} props
 */
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
