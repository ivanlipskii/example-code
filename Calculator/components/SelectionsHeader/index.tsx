import React, { memo, FC, MutableRefObject } from 'react'

import { i18n } from '@mplatform/i18n'

import classes from './style.module.scss'

const SelectionsHeaderRaw: FC<SelectionsHeaderProps> = ({ columnStateRef }) => {
  return (
    <div className={classes.header}>
      <div className={classes.index}>#</div>
      <div className={classes.info}>{i18n.value('system.calculator.selections')}</div>
      <div className={classes.tools}>
        <div className={classes.coeff}>{i18n.value('system.calculator.odds')}</div>
        <div className={classes.state} ref={columnStateRef}>
          {i18n.value('system.calculator.won')}
        </div>
      </div>
    </div>
  )
}

interface SelectionsHeaderProps {
  columnStateRef?: MutableRefObject<HTMLDivElement | null>
}

export const SelectionsHeader = memo(SelectionsHeaderRaw)
export default SelectionsHeader
