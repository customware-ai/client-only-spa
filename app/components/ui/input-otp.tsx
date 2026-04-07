"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "~/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    data-slot="input-otp"
    containerClassName={cn("flex items-center gap-2", containerClassName)}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

function InputOTPGroup({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="input-otp-group" className={cn("flex items-center gap-2", className)} {...props} />
}

function InputOTPSeparator({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="input-otp-separator" className={cn("text-muted-foreground", className)} {...props}>-</div>
}

function InputOTPSlot({
  index,
  className,
}: {
  index: number
  className?: string
}): React.ReactElement {
  const context = React.useContext(OTPInputContext)
  const slot = context.slots[index]

  return (
    <div
      data-slot="input-otp-slot"
      className={cn(
        "relative flex size-10 items-center justify-center rounded-md border border-input bg-card text-sm font-medium shadow-xs transition-shadow",
        slot.isActive && "ring-2 ring-ring",
        className,
      )}
    >
      {slot.char ?? slot.placeholderChar}
      {slot.hasFakeCaret ? <div className="pointer-events-none absolute inset-y-2 w-px animate-pulse bg-foreground" /> : null}
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
