import React, { memo, FC } from 'react'
import classnames from 'classnames'

import { ScrollPositionType } from './../../../../types'

import classes from './../../style.module.scss'

const HeaderRaw: FC<HeaderProps> = ({ scrollPosition, tableHeaderColumns, tableColumnsSizes }) => {
  return (
    <div className={classnames(classes.row, classes.header, classes[scrollPosition])}>
      {tableHeaderColumns.map((column, index) => {
        return (
          <div className={classes.cell} style={{ width: tableColumnsSizes[index] }} key={index}>
            {column}
          </div>
        )
      })}
    </div>
  )
}

export interface HeaderProps {
  scrollPosition: ScrollPositionType
  tableHeaderColumns: string[]
  tableColumnsSizes: number[]
}

export const Header = memo(HeaderRaw)
export default Header
