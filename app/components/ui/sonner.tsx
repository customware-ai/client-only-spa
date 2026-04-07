"use client"

import * as React from "react"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps): React.ReactElement {
  const [theme, setTheme] = React.useState<ToasterProps["theme"]>("light")

  React.useEffect((): (() => void) => {
    const syncTheme = (): void => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")
    }

    syncTheme()
    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return (): void => observer.disconnect()
  }, [])

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group border-0 bg-card text-card-foreground shadow-lg ring-1 ring-stone-200/80 dark:ring-zinc-800/80",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
