import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * @typedef {Object} BreadcrumbProps
 * @property {React.ReactNode} [separator]
 * @property {string} [className]
 */

/**
 * A navigational component to show the user's location within a website hierarchy.
 * @param {BreadcrumbProps & React.ComponentPropsWithoutRef<"nav">} props
 */
const Breadcrumb = React.forwardRef(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

/**
 * @typedef {Object} BreadcrumbListProps
 * @property {string} [className]
 */

/**
 * A container for the breadcrumb items.
 * @param {BreadcrumbListProps & React.ComponentPropsWithoutRef<"ol">} props
 */
const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

/**
 * @typedef {Object} BreadcrumbItemProps
 * @property {string} [className]
 */

/**
 * An item within the breadcrumb list.
 * @param {BreadcrumbItemProps & React.ComponentPropsWithoutRef<"li">} props
 */
const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

/**
 * @typedef {Object} BreadcrumbLinkProps
 * @property {boolean} [asChild]
 * @property {string} [className]
 */

/**
 * A link component for a breadcrumb item.
 * @param {BreadcrumbLinkProps & React.ComponentPropsWithoutRef<"a">} props
 */
const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

/**
 * @typedef {Object} BreadcrumbPageProps
 * @property {string} [className]
 */

/**
 * The current page within the breadcrumb, which is not a link.
 * @param {BreadcrumbPageProps & React.ComponentPropsWithoutRef<"span">} props
 */
const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

/**
 * @typedef {Object} BreadcrumbSeparatorProps
 * @property {string} [className]
 */

/**
 * A separator for breadcrumb items.
 * @param {BreadcrumbSeparatorProps & React.ComponentProps<"li">} props
 */
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

/**
 * @typedef {Object} BreadcrumbEllipsisProps
 * @property {string} [className]
 */

/**
 * A component to represent collapsed breadcrumb items.
 * @param {BreadcrumbEllipsisProps & React.ComponentProps<"span">} props
 */
const BreadcrumbEllipsis = ({
  className,
  ...props
}) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
