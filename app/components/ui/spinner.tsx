"use client"

import * as React from "react"
import { LoaderCircleIcon } from "lucide-react"

import { cn } from "~/lib/utils"

function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof LoaderCircleIcon>): React.ReactElement {
  return <LoaderCircleIcon className={cn("size-4 animate-spin text-muted-foreground", className)} {...props} />
}

export { Spinner }
