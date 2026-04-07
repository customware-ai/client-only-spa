"use client"

import * as React from "react"

import { cn } from "~/lib/utils"

function FieldSet({
  className,
  ...props
}: React.ComponentProps<"fieldset">): React.ReactElement {
  return <fieldset className={cn("grid gap-4", className)} {...props} />
}

function FieldGroup({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div className={cn("grid gap-4", className)} {...props} />
}

function Field({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div className={cn("grid gap-2", className)} {...props} />
}

function FieldContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div className={cn("grid gap-2", className)} {...props} />
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<"label">): React.ReactElement {
  return <label className={cn("text-sm font-medium text-foreground", className)} {...props} />
}

function FieldTitle({
  className,
  ...props
}: React.ComponentProps<"legend">): React.ReactElement {
  return <legend className={cn("text-sm font-semibold text-foreground", className)} {...props} />
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function FieldSeparator({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div className={cn("h-px bg-border", className)} {...props} />
}

export {
  FieldSet,
  FieldGroup,
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSeparator,
}
