"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "~/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    data-slot="progress"
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    value={value}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-primary transition-[width]"
      style={{ width: `${value ?? 0}%` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = "Progress"

export { Progress }
