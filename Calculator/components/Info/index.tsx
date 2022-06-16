import React, { memo, FC } from 'react'
import cn from 'classnames'

import { i18n } from '@mplatform/i18n'

import classes from './style.module.scss'

const InfoRaw: FC<InfoProps> = ({
  stakeAmount,
  combinationCount,
  winCombinationCount,
  potentialReturns,
  combinationCost,
  numberOfResults,
}) => {
  const data = [
    {
      key: 'stake_amount',
      value: stakeAmount,
    },
    {
      key: 'number_of_results',
      value: numberOfResults,
    },
    {
      key: 'combination_cost',
      value: combinationCost,
    },
    {
      key: 'number_of_combination',
      value: combinationCount,
    },
    {
      key: 'winning_combinations',
      value: winCombinationCount,
    },
    {
      key: 'potential_returns',
      value: potentialReturns,
    },
  ]

  return (
    <div className={classes.info}>
      {data.map((item) => {
        const { key, value } = item

        return (
          <div className={classes.item} key={key}>
            <div className={classes.dot}></div>
            <div className={classes.label}>{i18n.value(`system.calculator.${key}`)}</div>
            <div
              className={cn(classes.value, {
                [classes.valueGreen]: key === 'potential_returns',
              })}
            >
              {value}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export interface InfoProps {
  stakeAmount: string
  combinationCount: number
  winCombinationCount: number
  potentialReturns: string
  combinationCost: string
  numberOfResults: number
}

export const Info = memo(InfoRaw)
export default Info
