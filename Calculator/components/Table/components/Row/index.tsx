import React, { memo, useContext, CSSProperties, FC } from 'react'
import classnames from 'classnames'
import { areEqual } from 'react-window'

import TableScrollerContext from './../../../../TableScrollerContext'
import classes from './../../style.module.scss'

const RowRaw: FC<RowProps> = ({ data, index, style }) => {
  const { scrollPosition, tableColumnsSizes } = useContext(TableScrollerContext)

  const item = data[index]
  const isLastRow = index === data.length - 1

  const rowStyle = {
    ...style,
    width: 'auto',
  }

  return (
    <div
      className={classnames(classes.row, classes[scrollPosition], {
        [classes.lastRow]: isLastRow,
      })}
      style={rowStyle}
    >
      {item.map((cell, index) => {
        return (
          <div className={classes.cell} style={{ width: tableColumnsSizes[index] }} key={index}>
            {cell}
          </div>
        )
      })}
    </div>
  )
}

export interface RowProps {
  data: string[][]
  index: number
  style: CSSProperties
}

const Row = memo(RowRaw, areEqual)
export default Row
