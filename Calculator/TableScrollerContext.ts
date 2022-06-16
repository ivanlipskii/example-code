import { createContext, MutableRefObject } from 'react'

import { SCROLL_POSITIONS } from './types'

interface ITableScrollerContext {
  onScroll: (e) => void
  stickyHeaderRef: MutableRefObject<HTMLDivElement | null>
  listRef: MutableRefObject<HTMLDivElement | null>
  scrollPosition: SCROLL_POSITIONS
  tableHeaderColumns: string[]
  tableColumnsSizes: number[]
}

const TableScrollerContext = createContext<ITableScrollerContext>({
  onScroll: (e) => {},
  stickyHeaderRef: {
    current: null,
  },
  listRef: {
    current: null,
  },
  scrollPosition: SCROLL_POSITIONS.START,
  tableHeaderColumns: [],
  tableColumnsSizes: [],
})

export default TableScrollerContext
