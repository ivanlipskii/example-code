import React, { memo, FC, useContext, Fragment, useMemo, MutableRefObject, forwardRef, CSSProperties } from 'react'
import { FixedSizeList as List } from 'react-window'

import { i18n } from '@mplatform/i18n'

import Header from './components/Header'
import Row from './components/Row'
import TableScrollerContext from './../../TableScrollerContext'

import classes from './style.module.scss'

interface OuterElementTypeProps {
  style: CSSProperties
}

const outerElementType = forwardRef<HTMLDivElement, OuterElementTypeProps>(({ children, style }) => {
  const { onScroll, listRef, scrollPosition, tableHeaderColumns, tableColumnsSizes } = useContext(TableScrollerContext)

  return (
    <div
      onScroll={(e) => {
        e.preventDefault()
        onScroll(e)
      }}
      style={style}
      ref={listRef}
    >
      <Header
        scrollPosition={scrollPosition}
        tableHeaderColumns={tableHeaderColumns}
        tableColumnsSizes={tableColumnsSizes}
      />
      <div className={classes.rows}>{children}</div>
    </div>
  )
})

const TableRaw: FC<TableProps> = ({ tableRef, tableHeight, tableList, potentialReturns }) => {
  return (
    <Fragment>
      <div className={classes.table}>
        <List
          outerElementType={outerElementType}
          height={tableHeight}
          width={'100%'}
          itemCount={tableList.length}
          itemSize={32}
          itemData={tableList}
          ref={tableRef}
          style={{ height: '100% !important' }}
          overscanCount={4}
        >
          {Row}
        </List>
      </div>
      <div className={classes.potentialReturns}>
        {i18n.value('system.calculator.pot_return')}:{' '}
        <span className={classes.potentialReturnsValue}>{potentialReturns}</span>
      </div>
    </Fragment>
  )
}

export interface TableProps {
  tableRef: MutableRefObject<List | null>
  tableHeight: number
  tableList: string[][]
  potentialReturns: string
}

export const Table = memo(TableRaw)
export default Table
