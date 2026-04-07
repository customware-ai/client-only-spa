"use client"

import * as React from "react"

import { cn } from "~/lib/utils"

function Item({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="item" className={cn("flex items-start gap-3 rounded-xl border border-border bg-card p-4", className)} {...props} />
}

function ItemMedia({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="item-media" className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground", className)} {...props} />
}

function ItemContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="item-content" className={cn("min-w-0 flex-1 space-y-2", className)} {...props} />
}

function ItemHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="item-header" className={cn("flex items-start justify-between gap-3", className)} {...props} />
}

function ItemTitle({
  className,
  ...props
}: React.ComponentProps<"h4">): React.ReactElement {
  return <h4 data-slot="item-title" className={cn("text-sm font-semibold", className)} {...props} />
}

function ItemDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return <p data-slot="item-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function ItemActions({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="item-actions" className={cn("flex shrink-0 items-center gap-2", className)} {...props} />
}

function ItemFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="item-footer" className={cn("flex flex-wrap items-center gap-2 pt-1", className)} {...props} />
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemHeader,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemFooter,
}
