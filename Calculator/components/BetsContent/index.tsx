import React, { memo, FC, useEffect } from 'react'

import { i18n } from '@mplatform/i18n'
import { stubs } from 'root/scripts/deprecated-hub/bad-ui'

import EmptyBetslipMdPic from 'root/assets/assets-svg-sprite/lib/pictures/empty-bet-slip.svg'
import EmptyBetslipSmPic from 'root/assets/assets-svg-sprite/lib/pictures/empty-bet-slip-small.svg'
import EmptySelectionsPic from 'root/assets/assets-svg-sprite/lib/pictures/selections-not-suitable.svg'
import { betConstants } from 'root/scripts/deprecated-hub/bet-core'

const LOAD_SELECTIONS_STATE_TIMEOUT = 15 * 1000

import Coupon from '../Coupon'
import { useMappedState, useMappedActions } from './bindings'

export interface BetsContentProps {
  columnStateWidth: any
  betId?: number
}

export const BetsContentRaw: FC<BetsContentProps> = ({ columnStateWidth, betId }) => {
  const { bets, isPlaceAllowed, isSmallType } = useMappedState()
  const actions = useMappedActions()

  const getBetKey = (bet) => {
    const { treeId } = bet
    const { eventId, uid } = bet.selectionRef
    const { type } = bet.currCoeff
    return `${treeId}-${eventId}-${uid}-${type}`
  }

  useEffect(() => {
    const loadTimer = setInterval(() => {
      actions.loadCalculatorSelectionsState(betId)
    }, LOAD_SELECTIONS_STATE_TIMEOUT)
    return () => clearTimeout(loadTimer)
  }, [betId])

  if (!bets.length) {
    return (
      <stubs.EmptyContentStub
        key="content"
        Icon={isSmallType ? EmptyBetslipSmPic : EmptyBetslipMdPic}
        title={i18n.value(`history.bets.empty_betslip.title`)}
        note={i18n.value('history.bets.empty_betslip.description')}
        size={isSmallType ? 'md' : 'lg'}
      />
    )
  }

  if (!isPlaceAllowed) {
    return (
      <stubs.EmptyContentStub
        key="content"
        Icon={EmptySelectionsPic}
        iconFill="#bec6ce"
        title={i18n.value(`betslip.unavailable_tab_${betConstants.BET_TYPES_TABS.SYSTEM}`)}
        note={i18n.value('betslip.unavailable_tab_system.notes')}
        size="lg"
      />
    )
  }

  return (
    <div data-test={dt.value('betslip__selections')}>
      {bets.map((bet, idx) => {
        return <Coupon key={getBetKey(bet)} idx={idx} isFromBetDetails={!!betId} columnStateWidth={columnStateWidth} />
      })}
    </div>
  )
}

export const BetsContent = memo(BetsContentRaw)
export default BetsContent
