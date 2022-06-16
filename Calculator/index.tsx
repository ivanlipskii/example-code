import React, { memo, Fragment, useMemo, useEffect, FC, useCallback, useRef, useLayoutEffect, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import isEmpty from 'lodash/isEmpty'

import { i18n } from '@mplatform/i18n'
import FrameHeader from 'root/scripts/deprecated-hub/frame-header'
import { CtxLoader, layouts } from '@mplatform/ui'
import { stubs } from 'root/scripts/deprecated-hub/bad-ui'
import { useCalculator } from 'root/scripts/deprecated-hub/bet-core'
import CalculatorUnavailablePic from 'root/assets/assets-svg-sprite/lib/pictures/calculator_unavailable.svg'

import BetsContent from './components/BetsContent'
import Summary from './components/Summary'
import Header from './components/Header'
import StickyHeader from './components/StickyHeader'
import SelectionsHeader from './components/SelectionsHeader'
import useVirtualizeCalculator from './hooks/useVirtualizeCalculator'
import useSyncSystemSelectWidth from './hooks/useSyncSystemSelectWidth'

import TableScrollerContext from './TableScrollerContext'
import classes from './style.module.scss'
import { useMappedActions, useMappedState } from './bindings'

const CalculatorRaw: FC = () => {
  const { calculatorStake, numberOfResults, isRestoreFromStorageEnded, betId } = useMappedState()
  const actions = useMappedActions()

  const {
    isLoading,
    hasError,
    tableHeaderColumns,
    tableColumnsSizes,
    tableList,
    combinationCount,
    winCombinationCount,
    potentialReturns,
    combinationCost,
    stakeAmount,
    fetchCalculator,
  } = useCalculator(betId)

  const {
    tableRef,
    scrollerRef,
    selectionsRef,
    tableStickyHeaderRef,
    tableListRef,
    isShowStickyHeader,
    isShowStickySelectionsHeader,
    isShowStickyTableHeader,
    scrollPosition,
    handleTableScroll,
    handleOnResize,
  } = useVirtualizeCalculator()

  const { systemSelectWidth, systemSelectRef } = useSyncSystemSelectWidth(tableColumnsSizes)

  useEffect(() => {
    handleOnResize()
  }, [tableColumnsSizes])

  const handleOnGoBack = useCallback(async () => {
    await actions.backward()
    actions.setIsBetslipOpened(true)
    actions.recheckFull()
  }, [])

  const selectionsHeaderColumnStateRef = useRef<HTMLDivElement>(null)

  const [columnStateWidth, setColumnStateWidth] = useState(0)

  useEffect(() => {
    if (selectionsHeaderColumnStateRef.current) {
      setColumnStateWidth(selectionsHeaderColumnStateRef.current.clientWidth)
    }
  }, [selectionsHeaderColumnStateRef.current])

  const renderErrorStub = useMemo(() => {
    if (numberOfResults) {
      return (
        <stubs.EmptyContentStub
          key="content"
          Icon={CalculatorUnavailablePic}
          iconFill="#bec6ce"
          title={i18n.value(`system.stub.title`)}
          note={i18n.value('system.stub.descr')}
          buttonText={i18n.value('system.stub.btn')}
          size="lg"
          onClickBtn={handleOnGoBack}
        />
      )
    } else {
      return (
        <stubs.EmptyContentStub
          key="content"
          Icon={CalculatorUnavailablePic}
          iconFill="#bec6ce"
          title={i18n.value(`system.stub.title`)}
          note={i18n.value('system.stub.descr')}
          size="lg"
        />
      )
    }
  }, [numberOfResults])

  const renderContent = useMemo(() => {
    if (hasError || (isRestoreFromStorageEnded && !numberOfResults && !betId)) {
      return renderErrorStub
    }
    if (isLoading && isEmpty(tableList) && !hasError) {
      return <CtxLoader message={i18n.value('general.loading')} />
    }

    return (
      <AutoSizer disableWidth>
        {({ height }) => {
          return (
            <Fragment>
              <Header
                calculatorStake={calculatorStake}
                potentialReturns={potentialReturns}
                combinationCount={combinationCount}
                systemSelectRef={systemSelectRef}
                isShowStickyHeader={isShowStickyHeader}
              />
              <SelectionsHeader columnStateRef={selectionsHeaderColumnStateRef} />
              <div className={classes.selections} ref={selectionsRef}>
                <BetsContent columnStateWidth={columnStateWidth} betId={betId} />
              </div>
              <Summary
                tableHeight={height}
                tableRef={tableRef}
                tableList={tableList}
                stakeAmount={stakeAmount}
                combinationCost={combinationCost}
                combinationCount={combinationCount}
                winCombinationCount={winCombinationCount}
                potentialReturns={potentialReturns}
                numberOfResults={numberOfResults}
                fetchCalculator={fetchCalculator}
                isLoading={isLoading}
              />
            </Fragment>
          )
        }}
      </AutoSizer>
    )
  }, [
    isLoading,
    tableColumnsSizes,
    tableList,
    hasError,
    calculatorStake,
    potentialReturns,
    combinationCount,
    winCombinationCount,
    combinationCost,
    stakeAmount,
    numberOfResults,
    fetchCalculator,
    isRestoreFromStorageEnded,
    renderErrorStub,
    isShowStickyHeader,
    columnStateWidth,
  ])

  return (
    <TableScrollerContext.Provider
      value={{
        onScroll: handleTableScroll,
        stickyHeaderRef: tableStickyHeaderRef,
        listRef: tableListRef,
        tableHeaderColumns,
        tableColumnsSizes,
        scrollPosition,
      }}
    >
      <layouts.FrameLayout className={classes.page} getScrollNode={scrollerRef}>
        <Fragment key="header">
          <FrameHeader
            handleOnClose={actions.backward}
            handleOnGoBack={handleOnGoBack}
            title={i18n.value('system.calculator.title')}
          />
          {isShowStickyHeader && (
            <StickyHeader
              isShowSelectionsHeader={isShowStickySelectionsHeader}
              isShowTableHeader={isShowStickyTableHeader}
              calculatorStake={calculatorStake}
              potentialReturns={potentialReturns}
              combinationCount={combinationCount}
              systemSelectWidth={systemSelectWidth}
            />
          )}
        </Fragment>
        <Fragment key="unnamed">
          <div className={classes.content}>{renderContent}</div>
        </Fragment>
      </layouts.FrameLayout>
    </TableScrollerContext.Provider>
  )
}

export const CalculatorPage = memo(CalculatorRaw)
export default CalculatorPage
