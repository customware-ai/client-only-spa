"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/Popover"

export type ComboboxOption = {
  label: string
  value: string
}

type ComboboxProps = {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyLabel?: string
  className?: string
  disabled?: boolean
}

function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyLabel = "No option found.",
  className,
  disabled,
}: ComboboxProps): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          <span className="truncate">{selected?.label ?? placeholder}</span>
          <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={(): void => {
                    onChange?.(option.value === value ? "" : option.value)
                    setOpen(false)
                  }}
                >
                  <CheckIcon className={cn("size-4", option.value === value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox }
