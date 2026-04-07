"use client"

import * as React from "react"
import { HoverCard as HoverCardPrimitive } from "radix-ui"

import { cn } from "~/lib/utils"

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>): React.ReactElement {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>): React.ReactElement {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
}

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      data-slot="hover-card-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-80 rounded-xl border-0 bg-popover p-4 text-popover-foreground shadow-lg ring-1 ring-stone-200/80 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 dark:ring-zinc-800/80",
        className,
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
))
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }
