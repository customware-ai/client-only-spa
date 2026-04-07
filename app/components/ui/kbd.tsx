"use client"

import * as React from "react"

import { cn } from "~/lib/utils"

function Kbd({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return <kbd className={cn("inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-muted px-1.5 text-[11px] font-medium text-muted-foreground", className)} {...props} />
}

function KbdGroup({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return <span className={cn("inline-flex items-center gap-1", className)} {...props} />
}

export { Kbd, KbdGroup }
