import React, { memo, FC, useCallback, MutableRefObject } from 'react'
import cn from 'classnames'

import { BetTypeOption } from 'root/scripts/deprecated-hub/common'
import { i18n } from '@mplatform/i18n'
import { betConstants } from 'root/scripts/deprecated-hub/bet-core'
import { useFontResize } from 'root/scripts/deprecated-hub/hooks-ui-web'

import SystemTypeSelect from './../SystemTypeSelect'

import classes from './style.module.scss'

const HeaderRaw: FC<HeaderProps> = ({
  calculatorStake,
  potentialReturns,
  combinationCount,
  isSmall = false,
  systemSelectRef,
  systemSelectWidth,
  isShowStickyHeader,
}) => {
  const valueRef = useFontResize<HTMLDivElement>({}, [calculatorStake, potentialReturns, combinationCount])

  const headLeftStyle = systemSelectWidth
    ? {
        maxWidth: `${systemSelectWidth}px`,
        width: `${systemSelectWidth}px`,
      }
    : undefined

  return (
    <div
      className={cn(classes.resizeHeader, {
        [classes.small]: isSmall,
        [classes.hidden]: isShowStickyHeader,
      })}
      ref={valueRef}
    >
      <div className={classes.head}>
        <div className={classes.headLeft} ref={systemSelectRef} style={headLeftStyle}>
          <SystemTypeSelect isSmall={isSmall} />
        </div>
        <div className={classes.headRight}>
          <div className={classes.option}>
            <span className={classes.optionLabel}>{i18n.value('system.calculator.stake')}: </span>
            <span className={classes.optionValue}>{calculatorStake}</span>
          </div>
          <div className={classes.option}>
            <span className={classes.optionLabel}>{i18n.value('system.calculator.pot_return')}: </span>
            <span className={cn(classes.optionValue, classes.optionValueGreen)}>{potentialReturns}</span>
          </div>
          <div className={classes.option}>
            <span className={classes.optionLabel}>{i18n.value('system.calculator.combinations')}: </span>
            <span className={classes.optionValue}>{combinationCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export interface HeaderProps {
  calculatorStake: string
  potentialReturns: string
  combinationCount: number
  isSmall?: boolean
  systemSelectRef?: MutableRefObject<HTMLDivElement | null>
  systemSelectWidth?: number
  isShowStickyHeader?: boolean
}

export const Header = memo(HeaderRaw)
export default Header
