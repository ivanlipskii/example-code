import React, { memo, FC } from 'react'

import Header, { HeaderProps } from './../Header'
import SelectionsHeader from './../SelectionsHeader'
import StickyTableHeader from './../StickyTableHeader'

import classes from './style.module.scss'

const StickyHeaderRaw: FC<StickyHeaderProps> = ({
  isShowSelectionsHeader,
  isShowTableHeader,
  calculatorStake,
  potentialReturns,
  combinationCount,
  systemSelectWidth,
}) => {
  return (
    <div className={classes.stickyHeader}>
      <div className={classes.animation}>
        <Header
          calculatorStake={calculatorStake}
          potentialReturns={potentialReturns}
          combinationCount={combinationCount}
          systemSelectWidth={systemSelectWidth}
          isSmall
        />
      </div>
      {isShowSelectionsHeader && <SelectionsHeader />}
      {isShowTableHeader && <StickyTableHeader />}
    </div>
  )
}

interface StickyHeaderProps extends HeaderProps {
  isShowSelectionsHeader: boolean
  isShowTableHeader: boolean
}

export const StickyHeader = memo(StickyHeaderRaw)
export default StickyHeader
