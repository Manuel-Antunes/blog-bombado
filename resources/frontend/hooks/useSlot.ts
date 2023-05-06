import React, { ReactNode } from 'react'
import flattenChildren from 'react-keyed-flatten-children'

type Slot = { slot: string } & ReactNode

type Slots = { [key: string]: Slot[] }

export function useSlots<T>(children: ReactNode, ref: React.RefObject<T>) {
  return flattenChildren(children).reduce((acc, child) => {
    const slot = ((child as React.ReactElement).type as unknown as { slot: number })?.slot
    const clonnedChild = React.cloneElement(child as React.ReactElement, {
      ref,
    })
    return slot
      ? {
          ...acc,
          [slot]: acc[slot] ? [...acc[slot], clonnedChild] : [clonnedChild],
        }
      : acc
  }, {} as Slots)
}

export function beSlot<T>(Component: T, name: string) {
  ;(Component as unknown as Slot).slot = name
  return Component
}
