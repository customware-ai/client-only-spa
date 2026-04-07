"use client"

import * as React from "react"

import { cn } from "~/lib/utils"

function Empty({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="empty" className={cn("rounded-xl border border-dashed border-border bg-muted/40 p-6", className)} {...props} />
}

function EmptyHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="empty-header" className={cn("flex flex-col gap-2", className)} {...props} />
}

function EmptyMedia({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="empty-media" className={cn("flex size-12 items-center justify-center rounded-xl bg-background text-muted-foreground ring-1 ring-border", className)} {...props} />
}

function EmptyTitle({
  className,
  ...props
}: React.ComponentProps<"h3">): React.ReactElement {
  return <h3 data-slot="empty-title" className={cn("text-base font-semibold", className)} {...props} />
}

function EmptyDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return <p data-slot="empty-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function EmptyContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="empty-content" className={cn("mt-4 flex flex-wrap gap-2", className)} {...props} />
}

export { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent }
