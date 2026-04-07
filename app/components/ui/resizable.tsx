"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import { Group, Panel, Separator } from "react-resizable-panels"

import { cn } from "~/lib/utils"

function ResizablePanelGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof Group>): React.ReactElement {
  return <Group className={cn("flex h-full w-full", orientation === "vertical" && "flex-col", className)} orientation={orientation} {...props} />
}

const ResizablePanel = Panel

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean
}): React.ReactElement {
  return (
    <Separator
      className={cn("relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:top-1/2 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0", className)}
      {...props}
    >
      {withHandle ? (
        <div className="z-10 flex size-5 items-center justify-center rounded-md border border-border bg-background shadow-xs">
          <GripVerticalIcon className="size-3.5 text-muted-foreground" />
        </div>
      ) : null}
    </Separator>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
