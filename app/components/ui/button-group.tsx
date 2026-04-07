"use client"

import * as React from "react"

import { cn } from "~/lib/utils"

function ButtonGroup({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="button-group"
      className={cn("inline-flex items-center rounded-lg bg-card p-1 shadow-xs ring-1 ring-stone-200/80 dark:ring-zinc-800/80", className)}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="button-group-separator" className={cn("mx-1 h-6 w-px bg-border", className)} {...props} />
}

function ButtonGroupText({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return <span data-slot="button-group-text" className={cn("px-2 text-sm text-muted-foreground", className)} {...props} />
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
