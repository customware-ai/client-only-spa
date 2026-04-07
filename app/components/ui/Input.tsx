"use client"

import * as React from "react"

import { cn } from "~/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    const generatedId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={generatedId}
            className="mb-2 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={generatedId}
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border-0 bg-transparent px-3 py-1 text-base shadow-xs ring-1 ring-stone-200/80 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:shadow-sm dark:ring-zinc-800/80",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            error && "border-destructive aria-invalid:ring-destructive/20",
            className,
          )}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {error ? (
          <p className="mt-2 text-[0.8rem] font-medium text-destructive">{error}</p>
        ) : helperText ? (
          <p className="mt-2 text-[0.8rem] text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
