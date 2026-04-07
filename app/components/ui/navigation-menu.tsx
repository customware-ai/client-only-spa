"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"

import { cn } from "~/lib/utils"

function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>): React.ReactElement {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
      {...props}
    />
  )
}

function NavigationMenuItem({
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>): React.ReactElement {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />
}

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    data-slot="navigation-menu-trigger"
    className={cn(
      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/70",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDownIcon className="relative top-px ml-1 size-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    data-slot="navigation-menu-content"
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out md:absolute md:w-auto",
      className,
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = "NavigationMenuContent"

function NavigationMenuLink({
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>): React.ReactElement {
  return <NavigationMenuPrimitive.Link data-slot="navigation-menu-link" {...props} />
}

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      data-slot="navigation-menu-viewport"
      className={cn(
        "origin-top-center relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-xl border-0 bg-popover text-popover-foreground shadow-lg ring-1 ring-stone-200/80 transition-[width,height] duration-200 md:w-[var(--radix-navigation-menu-viewport-width)] dark:ring-zinc-800/80",
        className,
      )}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName = "NavigationMenuViewport"

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    data-slot="navigation-menu-indicator"
    className={cn("top-full z-[1] flex h-2 items-end justify-center overflow-hidden", className)}
    {...props}
  >
    <div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border shadow-xs" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

function navigationMenuTriggerStyle(): string {
  return "inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
