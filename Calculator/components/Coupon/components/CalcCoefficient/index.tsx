import React, { memo, FC } from 'react'
import { Coefficient } from 'root/scripts/deprecated-hub/event-module-web'
import { useMappedState } from './bindings'

export interface ICalcCoefficientProps extends React.HTMLAttributes<Element> {
  betIdx: number
}

export const CalcCoefficient: FC<ICalcCoefficientProps> = ({ betIdx }) => {
  const { coeffValue, coeffChange, coeffView, coeffOdds } = useMappedState(betIdx)

  return (
    <Coefficient
      value={coeffValue}
      changeType={coeffChange}
      notifyType={coeffView}
      oddsType={coeffOdds}
      dir="hor"
      size="md"
    />
  )
}

export default memo(CalcCoefficient)
