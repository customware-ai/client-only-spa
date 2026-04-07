"use client"

import * as React from "react"
import { toast as sonnerToast, type ExternalToast } from "sonner"

import { ToastAction, type ToastActionElement, type ToastProps } from "~/components/ui/toast"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement | React.ReactNode
}

type ToastInput = Omit<ToasterToast, "id"> & {
  id?: string
}

let count = 0

function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

function isToastActionElement(
  value: ToastActionElement | React.ReactNode | undefined,
): value is ToastActionElement {
  return React.isValidElement(value) && value.type === ToastAction
}

function getSonnerAction(
  action: ToastActionElement | React.ReactNode | undefined,
): ExternalToast["action"] | undefined {
  if (!action) {
    return undefined
  }

  if (!isToastActionElement(action)) {
    return action
  }

  const {
    children,
    onClick,
  } = action.props as React.ComponentProps<"button"> & { children?: React.ReactNode }

  return {
    label: children,
    onClick: (event: React.MouseEvent<HTMLButtonElement>): void => {
      onClick?.(event)
    },
  }
}

function toast({
  title,
  description,
  action,
  variant = "default",
  duration,
  className,
  id,
  onOpenChange,
}: ToastInput): {
  id: string
  dismiss: () => void
  update: (props: ToasterToast) => void
} {
  const toastId = id ?? genId()

  const showToast = (nextToast: ToastInput): void => {
    const method = nextToast.variant === "destructive" ? sonnerToast.error : sonnerToast

    method(nextToast.title ?? "", {
      id: toastId,
      description: nextToast.description,
      action: getSonnerAction(nextToast.action),
      duration: nextToast.duration,
      className: nextToast.className,
      onDismiss: (): void => {
        nextToast.onOpenChange?.(false)
      },
      onAutoClose: (): void => {
        nextToast.onOpenChange?.(false)
      },
    })
  }

  showToast({
    title,
    description,
    action,
    variant,
    duration,
    className,
    onOpenChange,
  })

  return {
    id: toastId,
    dismiss: (): void => {
      sonnerToast.dismiss(toastId)
    },
    update: (props: ToasterToast): void => {
      showToast(props)
    },
  }
}

function useToast(): {
  toasts: ToasterToast[]
  toast: typeof toast
  dismiss: (toastId?: string) => void
} {
  return {
    toasts: [],
    toast,
    dismiss: (toastId?: string): void => {
      sonnerToast.dismiss(toastId)
    },
  }
}

export { useToast, toast }
