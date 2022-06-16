import { services } from '@mplatform/lib'

import { SelectionStatus } from 'root/scripts/deprecated-hub/common'
import { useMapState } from 'root/scripts/deprecated-hub/hooks-core'
import { betSelectors } from 'root/scripts/deprecated-hub/bet-core'

export const useMappedState = (betIdx: number) => {
  return useMapState((state) => {
    const betStatus = betSelectors.getBetStatusByIdx(state, betIdx)
    return {
      isInactive: betStatus.state !== SelectionStatus.ACTIVE,
      alphabetIndex: services.getAlphabetIndex(betIdx),
      betState: betStatus.state,
    }
  })
}
