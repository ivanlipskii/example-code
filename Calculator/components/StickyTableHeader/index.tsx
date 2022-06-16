import React, { memo, useContext, useLayoutEffect, FC } from 'react'

import TableHeader from './../Table/components/Header'
import TableScrollerContext from './../../TableScrollerContext'

import classes from './style.module.scss'

const StickyTableHeaderRaw: FC = () => {
  const { stickyHeaderRef, listRef, tableHeaderColumns, tableColumnsSizes, scrollPosition } = useContext(
    TableScrollerContext,
  )

  useLayoutEffect(() => {
    if (stickyHeaderRef.current && listRef.current) {
      stickyHeaderRef.current.scrollLeft = listRef.current.scrollLeft
    }
  }, [])

  return (
    <div className={classes.tableHeader} ref={stickyHeaderRef}>
      <TableHeader
        tableHeaderColumns={tableHeaderColumns}
        tableColumnsSizes={tableColumnsSizes}
        scrollPosition={scrollPosition}
      />
    </div>
  )
}

export const StickyTableHeader = memo(StickyTableHeaderRaw)
export default StickyTableHeader
