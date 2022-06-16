import React, { memo, useState, useMemo, useCallback, FC } from 'react'
import classnames from 'classnames'

import { i18n } from '@mplatform/i18n'
import UpdateIcon from 'root/assets/assets-svg-sprite/lib/ui/update_calc.svg'

import Info, { InfoProps } from '../Info'
import Table, { TableProps } from '../Table'

import classes from './style.module.scss'

const SummaryRaw: FC<SummaryProps> = ({
  tableRef,
  tableHeight,
  tableList,
  stakeAmount,
  combinationCount,
  winCombinationCount,
  potentialReturns,
  combinationCost,
  numberOfResults,
  fetchCalculator,
  isLoading,
}) => {
  const [isTableMode, setIsTableMode] = useState(false)

  const onClickMore = useCallback(() => {
    setIsTableMode(!isTableMode)
  }, [isTableMode])

  const handleClickUpdate = () => {
    if (!isLoading) {
      fetchCalculator()
    }
  }

  const renderContent = useMemo(() => {
    if (isTableMode) {
      return (
        <Table
          tableRef={tableRef}
          tableHeight={tableHeight}
          tableList={tableList}
          potentialReturns={potentialReturns}
        />
      )
    }
    return (
      <Info
        combinationCount={combinationCount}
        winCombinationCount={winCombinationCount}
        potentialReturns={potentialReturns}
        combinationCost={combinationCost}
        stakeAmount={stakeAmount}
        numberOfResults={numberOfResults}
      />
    )
  }, [
    isTableMode,
    tableHeight,
    tableList,
    stakeAmount,
    combinationCount,
    winCombinationCount,
    potentialReturns,
    combinationCost,
    numberOfResults,
  ])

  return (
    <div className={classes.summary}>
      <div className={classes.head}>
        <div className={classes.title}>{i18n.value('system.calculator.summary')}</div>
        <button
          className={classnames(classes.update, {
            [classes.loading]: isLoading,
          })}
          onClick={handleClickUpdate}
        >
          <UpdateIcon className={classes.updateIcon} />
        </button>
        <button className={classes.more} onClick={onClickMore}>
          {isTableMode ? i18n.value('system.calculator.less') : i18n.value('system.calculator.more')}
        </button>
      </div>
      {renderContent}
    </div>
  )
}

export interface SummaryProps extends InfoProps, TableProps {
  fetchCalculator: () => void
  isLoading: boolean
}

export const Summary = memo(SummaryRaw)
export default Summary
