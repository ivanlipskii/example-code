import { useMapState } from 'root/scripts/deprecated-hub/hooks-core'
import { betSelectors } from 'root/scripts/deprecated-hub/bet-core'
import { userSelectors } from 'root/scripts/deprecated-hub/user-core'
import { dictionaryConstants } from 'root/scripts/deprecated-hub/dictionary-core'

export const getCoeffViewType = (state) => {
  const viewType = userSelectors.getViewType(state)
  const { ARROW } = dictionaryConstants.VIEW_TYPE
  return viewType !== 'OFF' ? viewType : ARROW
}

export const useMappedState = (idx: number) => {
  return useMapState((state) => {
    const bet = betSelectors.getBetByIdx(state, idx)

    return {
      coeffValue: betSelectors.getCoeffValue(state, bet.currCoeff) as string,
      coeffChange: betSelectors.getCoeffChangeType(state, bet),
      coeffOdds: userSelectors.getOddsType(state),
      coeffView: getCoeffViewType(state),
    }
  })
}
