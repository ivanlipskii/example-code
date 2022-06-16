import { useMapState } from 'root/scripts/deprecated-hub/hooks-core'
import { betSelectors } from 'root/scripts/deprecated-hub/bet-core'

export const useMappedState = (idx: number) => {
  return useMapState((state) => {
    const bet = betSelectors.getBetByIdx(state, idx)
    const { info } = bet

    return {
      eventMarket: info.eventMarket,
      eventSelName: info.eventSelName,
      eventName: info.eventName,
      isBankerActive: betSelectors.getIsBankerActive(state, idx),
    }
  })
}
