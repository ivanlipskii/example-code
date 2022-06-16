import { useState, useCallback, useRef } from 'react'
import { FixedSizeList } from 'react-window'

import { useOnScrollElement } from 'root/scripts/deprecated-hub/hooks-ui-web'

import { ScrollPositionType, SCROLL_POSITIONS } from './../types'

const STEP_TO_SHOW_STICKY_HEADER = 38
const STICKY_HEADER_SIZE = 71

const useVirtualizeCalculator = () => {
  const tableRef = useRef<FixedSizeList>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const selectionsRef = useRef<HTMLDivElement>(null)
  const tableStickyHeaderRef = useRef<HTMLDivElement>(null)
  const tableListRef = useRef<HTMLDivElement>(null)

  const [isShowStickyHeader, setIsShowStickyHeader] = useState(false)
  const [isShowStickySelectionsHeader, setIsShowStickySelectionsHeader] = useState(true)
  const [isShowStickyTableHeader, setIsShowStickyTableHeader] = useState(false)
  const [scrollPosition, setScrollPosition] = useState<ScrollPositionType>(SCROLL_POSITIONS.START)

  const checkStickyHeader = useCallback(
    (scrollTop: number) => {
      if (isShowStickyHeader) {
        if (STEP_TO_SHOW_STICKY_HEADER > scrollTop) {
          setIsShowStickyHeader(false)
        }
      } else {
        if (STEP_TO_SHOW_STICKY_HEADER < scrollTop) {
          setIsShowStickyHeader(true)
        }
      }
    },
    [isShowStickyHeader],
  )

  const checkStickySelectionsHeader = useCallback(
    (scrollTop: number) => {
      if (selectionsRef.current) {
        const selectionsHeaderDisplayBorder =
          selectionsRef.current.offsetHeight + selectionsRef.current.offsetTop - STICKY_HEADER_SIZE

        if (isShowStickySelectionsHeader) {
          if (scrollTop >= selectionsHeaderDisplayBorder) {
            setIsShowStickySelectionsHeader(false)
          }
        } else {
          if (scrollTop < selectionsHeaderDisplayBorder) {
            setIsShowStickySelectionsHeader(true)
          }
        }
      }
    },
    [isShowStickySelectionsHeader],
  )

  const checkStickyTableHeader = useCallback(
    (scrollTop: number) => {
      if (tableListRef.current) {
        const tableHeaderDisplayBorder = tableListRef.current.offsetTop - STICKY_HEADER_SIZE + 30

        if (isShowStickyTableHeader) {
          if (scrollTop <= tableHeaderDisplayBorder) {
            setIsShowStickyTableHeader(false)
          }
        } else {
          if (scrollTop > tableHeaderDisplayBorder) {
            setIsShowStickyTableHeader(true)
          }
        }
      }
    },
    [isShowStickyTableHeader],
  )

  const syncVirtualScroll = useCallback((scrollTop: number) => {
    if (tableRef.current && tableListRef.current) {
      const scrollOffset = scrollTop - tableListRef.current.offsetTop - STICKY_HEADER_SIZE

      if (scrollOffset <= 0) {
        tableRef.current.scrollTo(0)
      } else {
        tableRef.current.scrollTo(scrollOffset)
      }
    }
  }, [])

  const handleScroll = useCallback(
    (e) => {
      const scrollTop = e.target.scrollTop

      syncVirtualScroll(scrollTop)
      checkStickyHeader(scrollTop)
      checkStickySelectionsHeader(scrollTop)
      checkStickyTableHeader(scrollTop)
    },
    [checkStickyHeader, checkStickySelectionsHeader, checkStickyTableHeader],
  )

  useOnScrollElement({ element: scrollerRef, onScroll: handleScroll })

  const checkScrollPosition = useCallback(
    (scrollLeft: number) => {
      if (tableListRef.current) {
        const scrollPositionEnd = tableListRef.current.scrollWidth - tableListRef.current.clientWidth

        if (scrollLeft <= 0) {
          if (scrollPosition !== SCROLL_POSITIONS.START) {
            setScrollPosition(SCROLL_POSITIONS.START)
          }
        } else if (scrollPositionEnd - scrollLeft <= 0) {
          if (scrollPosition !== SCROLL_POSITIONS.END) {
            setScrollPosition(SCROLL_POSITIONS.END)
          }
        } else {
          if (scrollPosition !== SCROLL_POSITIONS.MIDDLE) {
            setScrollPosition(SCROLL_POSITIONS.MIDDLE)
          }
        }
      }
    },
    [scrollPosition],
  )

  const handleTableScroll = useCallback(
    (e) => {
      if (tableListRef.current) {
        const scrollLeft = e.target.scrollLeft

        if (tableStickyHeaderRef.current) {
          tableStickyHeaderRef.current.scrollLeft = scrollLeft
        }

        checkScrollPosition(scrollLeft)
      }
    },
    [checkScrollPosition],
  )

  const handleOnResize = useCallback(() => {
    if (tableListRef.current) {
      const scrollLeft = tableListRef.current.scrollLeft
      checkScrollPosition(scrollLeft)
    }
  }, [checkScrollPosition])

  return {
    tableRef,
    scrollerRef,
    selectionsRef,
    tableStickyHeaderRef,
    tableListRef,
    isShowStickyHeader,
    isShowStickySelectionsHeader,
    isShowStickyTableHeader,
    scrollPosition,
    handleTableScroll,
    handleOnResize,
  }
}

export default useVirtualizeCalculator
