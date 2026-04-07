"use client"

import * as React from "react"
import { Tooltip } from "recharts"

import { cn } from "~/lib/utils"

export type ChartConfig = Record<
  string,
  {
    label: string
    color: string
  }
>

function ChartContainer({
  className,
  config,
  children,
}: React.ComponentProps<"div"> & {
  config: ChartConfig
}): React.ReactElement {
  const chartElement = children as React.ReactElement<{
    responsive?: boolean
    style?: React.CSSProperties
  }>
  const style = Object.fromEntries(
    Object.entries(config).map(([key, value]) => [`--color-${key}`, value.color]),
  ) as React.CSSProperties

  return (
    <div
      data-slot="chart"
      style={style}
      className={cn("min-h-[200px] min-w-0 w-full text-xs", className)}
    >
      {React.isValidElement(chartElement)
        ? React.cloneElement(chartElement, {
            responsive: true,
            style: {
              width: "100%",
              height: "100%",
              ...chartElement.props.style,
            },
          })
        : null}
    </div>
  )
}

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  hideLabel = false,
}: {
  active?: boolean
  payload?: Array<{ color?: string; name?: string; value?: string | number; dataKey?: string }>
  label?: string | number
  className?: string
  hideLabel?: boolean
}): React.ReactElement | null {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={cn("min-w-44 rounded-lg border border-border bg-card p-3 shadow-lg", className)}>
      {hideLabel ? null : <div className="mb-2 text-xs font-medium text-foreground">{label}</div>}
      <div className="space-y-1.5">
        {payload.map((item) => (
          <div key={item.dataKey} className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span className="font-medium text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const ChartTooltip = Tooltip

export { ChartContainer, ChartTooltip, ChartTooltipContent }
