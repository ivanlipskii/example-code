import { useMapState, useMapActions } from 'root/scripts/deprecated-hub/hooks-core'
import { betSelectors, betConstants, betThunks } from 'root/scripts/deprecated-hub/bet-core'

export const useMappedState = () => {
  return useMapState((state) => {
    return {
      bets: betSelectors.getBets(state),
      isPlaceAllowed: !!betSelectors.getBetType(state),
      isSmallType: betSelectors.getStatus(state).betslipType === betConstants.BETSLIP_STATES.COLLAPSED,
    }
  })
}

export const useMappedActions = () => {
  return useMapActions({
    loadCalculatorSelectionsState: betThunks.loadCalculatorSelectionsState,
  })
}
