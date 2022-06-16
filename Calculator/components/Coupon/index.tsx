import React, { FC, memo, useMemo } from 'react'

import { SelectionStatus } from 'root/scripts/deprecated-hub/common'

import FailureIcon from 'root/assets/assets-svg-sprite/lib/ui/failure.svg'
import SuccessIcon from 'root/assets/assets-svg-sprite/lib/ui/success.svg'
import VoidIcon from 'root/assets/assets-svg-sprite/lib/ui/void.svg'

import BetInfo from './components/BetInfo'
import InactiveStub from './components/InactiveStub'
import CalcCoefficient from './components/CalcCoefficient'
import WonSwitch from './components/WonSwitch'

import classes from './style.module.scss'

import { useMappedState } from './bindings'

const { WIN, LOSE, VOID } = SelectionStatus

const CouponRaw: FC<ICouponProps> = ({ idx, columnStateWidth, isFromBetDetails }) => {
  const { isInactive, alphabetIndex, betState } = useMappedState(idx)
  const asideStyle = useMemo(() => {
    return columnStateWidth
      ? {
          minWidth: `calc(38% + ${columnStateWidth - 37}px)`,
        }
      : {}
  }, [columnStateWidth])

  const renderIcon = useMemo(() => {
    if (isFromBetDetails) {
      if (betState === VOID) {
        return <VoidIcon className={classes.staticIcn} fill="#1a68c4" />
      }
      if (betState === WIN) {
        return <SuccessIcon className={classes.staticIcn} fill="#00a057" />
      }
      if (betState === LOSE) {
        return <FailureIcon className={classes.staticIcn} fill="#ef4048" />
      }
    }

    return (
      <div
        className={classes.won}
        style={{
          width: `${columnStateWidth}px`,
        }}
      >
        <WonSwitch betIdx={idx} />
      </div>
    )
  }, [isFromBetDetails, betState, columnStateWidth, idx])

  return (
    <section className={classes.coupon} data-test={dt.value('betslip__selection')}>
      <div className={classes.inner}>
        <div className={classes.index}>
          <div className={classes.indexValue}>{alphabetIndex}</div>
        </div>

        <div className={classes.about}>
          <BetInfo betIdx={idx} />
        </div>
        <aside className={classes.aside} style={asideStyle}>
          <div className={classes.tools}>
            <div className={classes.price}>
              <CalcCoefficient betIdx={idx} />
            </div>
            {renderIcon}
          </div>
        </aside>
      </div>
      {isInactive && !isFromBetDetails && <InactiveStub />}
    </section>
  )
}

interface ICouponProps extends React.HTMLAttributes<Element> {
  idx: number
  columnStateWidth?: number
  isFromBetDetails?: boolean
}

export const Coupon = memo(CouponRaw)
export default Coupon
