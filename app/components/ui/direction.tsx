"use client"

import * as React from "react"
import { Direction } from "radix-ui"

type DirectionMode = "ltr" | "rtl"

type DirectionContextValue = {
  dir: DirectionMode
  setDir: React.Dispatch<React.SetStateAction<DirectionMode>>
}

const DirectionContext = React.createContext<DirectionContextValue | null>(null)

function DirectionProvider({
  children,
  initialDir = "ltr",
}: {
  children: React.ReactNode
  initialDir?: DirectionMode
}): React.ReactElement {
  const [dir, setDir] = React.useState<DirectionMode>(initialDir)

  return (
    <DirectionContext.Provider value={{ dir, setDir }}>
      <Direction.Provider dir={dir}>{children}</Direction.Provider>
    </DirectionContext.Provider>
  )
}

function useDirection(): DirectionContextValue {
  const context = React.useContext(DirectionContext)

  if (!context) {
    throw new Error("useDirection must be used within a DirectionProvider")
  }

  return context
}

export { DirectionProvider, useDirection, type DirectionMode }
