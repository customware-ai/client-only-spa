"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/components/ui/Button"

function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">): React.ReactElement {
  return <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">): React.ReactElement {
  return <ul className={cn("flex flex-row flex-wrap items-center justify-center gap-1.5", className)} {...props} />
}

function PaginationItem({
  ...props
}: React.ComponentProps<"li">): React.ReactElement {
  return <li {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  size?: "default" | "icon"
} & React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps): React.ReactElement {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "outline",
          size: size === "default" ? "sm" : "icon-sm",
        }),
        "min-w-8",
        className,
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>): React.ReactElement {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1.5 px-3.5", className)}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span>Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>): React.ReactElement {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1.5 px-3.5", className)}
      {...props}
    >
      <span>Next</span>
      <ChevronRightIcon className="size-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
