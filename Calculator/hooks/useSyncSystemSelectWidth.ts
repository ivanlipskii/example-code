import { useEffect, useRef, useState } from 'react'

const useSyncSystemSelectWidth = (recheckTrigger) => {
  const systemSelectRef = useRef<HTMLDivElement>(null)

  const [systemSelectWidth, setSystemSelectWidth] = useState(0)

  useEffect(() => {
    if (systemSelectRef.current) {
      const { width } = systemSelectRef.current.getBoundingClientRect()
      if (systemSelectWidth !== width) {
        setSystemSelectWidth(width)
      }
    }
  }, [recheckTrigger, systemSelectRef.current])

  return {
    systemSelectWidth,
    systemSelectRef,
  }
}

export default useSyncSystemSelectWidth
