"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/components/ui/Button"

type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps): React.ReactElement {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-fit p-3", className)}
      classNames={{
        months: "relative flex flex-col gap-4",
        month: "space-y-4",
        month_caption: "relative flex h-9 items-center justify-center px-10",
        caption_label: "text-sm font-medium",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "size-7 p-0"),
        button_next: cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "size-7 p-0"),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 rounded-md text-[0.8rem] font-medium text-muted-foreground",
        week: "mt-2 flex w-full",
        day: "h-9 w-9 p-0 text-center text-sm",
        day_button: cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "size-9 p-0 font-normal aria-selected:opacity-100"),
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: iconClassName }): React.ReactElement =>
          orientation === "left" ? (
            <ChevronLeftIcon className={cn("size-4", iconClassName)} />
          ) : (
            <ChevronRightIcon className={cn("size-4", iconClassName)} />
          ),
      }}
      {...props}
    />
  )
}

export { Calendar }
