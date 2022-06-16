import { hooks } from 'root/scripts/deprecated-hub/hooks-core'
import { betThunks, betSelectors } from 'root/scripts/deprecated-hub/bet-core'

export const useMappedState = () => {
  return hooks.useMapState((state) => {
    return {
      betTypesOptions: betSelectors.getAllBetTypesOptions(state, ''),
      betTypeKey: betSelectors.getBetTypeKey(state, ''),
    }
  })
}

export const useMappedActions = () => {
  return hooks.useMapActions({
    updateBetType: betThunks.updateBetType,
  })
}
