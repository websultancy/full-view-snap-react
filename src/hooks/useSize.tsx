import * as React from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import {ResizeObserver} from '@juggle/resize-observer'


export const useSize = (target:React.MutableRefObject<HTMLElement | null>) => {
    const [size, setSize] = React.useState({ width: 0, height: 0 })

    // Ensure the hook is only called inside a function component or another hook.
    // This error can occur if useSize is called outside of a component or custom hook.
    // Double-check that you are not calling useSize in module scope or inside a class component.

    React.useLayoutEffect(() => {
        if(target.current)
            setSize(target.current.getBoundingClientRect())
    }, [target])

    useResizeObserver(target, (entry:any) => setSize(entry.contentRect))
    return size
}

// Create another hook which handles an array of html elements in a ref object
export const useSizes = (targets: React.MutableRefObject<HTMLElement[] | null>) => {
  const [sizes, setSizes] = React.useState<DOMRectReadOnly[]>([])

  React.useLayoutEffect(() => {
    if (targets.current) {
      setSizes(targets.current
        .filter((element): element is HTMLElement => element !== null)
        .map((element) => element.getBoundingClientRect()))
    }
  }, [targets])

  React.useEffect(() => {
    const observers: ResizeObserver[] = []

    if (targets.current) {
      targets.current.forEach((element, index) => {
        const observer = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            setSizes((prevSizes) => {
              const newSizes = [...prevSizes]
              newSizes[index] = entry.contentRect
              return newSizes
            })
          })
        })
        observer.observe(element)
        observers.push(observer)
      })
    }

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [targets])

  return sizes
}