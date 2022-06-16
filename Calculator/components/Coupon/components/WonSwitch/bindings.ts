import { useMapState, useMapActions } from 'root/scripts/deprecated-hub/hooks-core'
import { betThunks, betSelectors } from 'root/scripts/deprecated-hub/bet-core'

export const useMappedState = (betIdx: number) => {
  return useMapState((state) => {
    const betStatus = betSelectors.getBetStatusByIdx(state, betIdx)
    return {
      isWonActive: betStatus.isWonActive,
    }
  })
}

export const useMappedActions = () => {
  return useMapActions({
    toggleBetWon: betThunks.toggleBetWon,
  })
}
