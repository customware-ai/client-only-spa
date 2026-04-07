"use client"

import * as React from "react"

import { cn } from "~/lib/utils"

type NativeSelectOption = {
  label: string
  value: string
}

type NativeSelectProps = React.ComponentProps<"select"> & {
  options: NativeSelectOption[]
  placeholder?: string
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <select
        ref={ref}
        data-slot="native-select"
        className={cn("flex h-9 w-full rounded-md border-0 bg-card px-3 py-2 text-sm shadow-xs ring-1 ring-stone-200/80 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring dark:ring-zinc-800/80", className)}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  },
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect, type NativeSelectOption }
