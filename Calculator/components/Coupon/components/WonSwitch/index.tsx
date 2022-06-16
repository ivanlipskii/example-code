import React, { memo, FC, useCallback } from 'react'
import { BooleanSwitch } from '@mplatform/ui'

import { useMappedState, useMappedActions } from './bindings'

export interface IWonSwitchProps extends React.HTMLAttributes<Element> {
  betIdx: number
}

export const WonSwitch: FC<IWonSwitchProps> = ({ betIdx }) => {
  const { isWonActive } = useMappedState(betIdx)

  const { toggleBetWon } = useMappedActions()

  const handleClickWon = useCallback(
    (flag) => {
      toggleBetWon(betIdx, flag)
    },
    [betIdx],
  )

  return <BooleanSwitch value={isWonActive} onSwitch={handleClickWon} size="xs" dataTest={dt.value('won')} />
}

export default memo(WonSwitch)
