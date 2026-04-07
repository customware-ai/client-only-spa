"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const toastVariants = cva("", {
  variants: {
    variant: {
      default: "",
      destructive: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ToastActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  altText: string
}

const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, altText, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={altText}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring",
        className,
      )}
      {...props}
    />
  ),
)
ToastAction.displayName = "ToastAction"

const ToastProvider = ({ children }: { children?: React.ReactNode }): React.ReactElement => <>{children}</>

const ToastViewport = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, ...props }, ref) => <div ref={ref} hidden {...props}>{children}</div>,
)
ToastViewport.displayName = "ToastViewport"

const Toast = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof toastVariants>
>(({ className, children, variant, ...props }, ref) => (
  <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
    {children}
  </div>
))
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm font-semibold", className)} {...props} />,
)
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<"p">>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
ToastDescription.displayName = "ToastDescription"

const ToastClose = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn("inline-flex size-8 items-center justify-center rounded-md", className)}
      {...props}
    >
      <XIcon className="size-4" />
    </button>
  ),
)
ToastClose.displayName = "ToastClose"

type ToastProps = VariantProps<typeof toastVariants> & {
  id?: string
  duration?: number
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  type ToastActionElement,
  type ToastActionProps,
  type ToastProps,
}
