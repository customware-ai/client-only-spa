"use client"

import * as React from "react"

import { cn } from "~/lib/utils"

function InputGroup({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="input-group"
      className={cn("flex min-h-9 w-full items-stretch overflow-hidden rounded-md border-0 bg-card shadow-xs ring-1 ring-stone-200/80 dark:ring-zinc-800/80", className)}
      {...props}
    />
  )
}

function InputGroupAddon({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="input-group-addon" className={cn("flex items-center px-3 text-sm text-muted-foreground", className)} {...props} />
}

function InputGroupButton({
  className,
  ...props
}: React.ComponentProps<"button">): React.ReactElement {
  return <button type="button" data-slot="input-group-button" className={cn("px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent", className)} {...props} />
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">): React.ReactElement {
  return <input data-slot="input-group-input" className={cn("h-9 w-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground", className)} {...props} />
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">): React.ReactElement {
  return <textarea data-slot="input-group-textarea" className={cn("min-h-24 w-full resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground", className)} {...props} />
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
}
