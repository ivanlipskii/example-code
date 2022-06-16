import { hooks } from 'root/scripts/deprecated-hub/hooks-core'

import { betActions } from 'root/scripts/deprecated-hub/common'
import { betThunks, betSelectors } from 'root/scripts/deprecated-hub/bet-core'

import { navThunks, navSelectors } from 'root/scripts/deprecated-hub/nav-core'

export const useMappedState = () => {
  return hooks.useMapState((state) => {
    const route = navSelectors.getRoute(state)
    const betId = route.params?.betId

    return {
      bets: betId ? betSelectors.getBets(state) : betSelectors.getActiveBets(state),
      calculatorStake: betSelectors.getCalculatorStake(state),
      numberOfResults: betId ? betSelectors.getBetsCount(state) : betSelectors.getActiveBetsCount(state),
      isRestoreFromStorageEnded: betSelectors.getIsRestoreFromStorageEnded(state),
      betId,
    }
  })
}

export const useMappedActions = () => {
  return hooks.useMapActions({
    redirect: navThunks.redirect,
    backward: navThunks.backward,
    setIsBetslipOpened: betActions.setIsBetslipOpened,
    recheckFull: betThunks.recheckFull,
  })
}
