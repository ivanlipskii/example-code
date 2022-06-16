import React, { memo, FC } from 'react'
import classnames from 'classnames'

import IconBanker from 'root/assets/assets-svg-sprite/lib/ui/banker.svg'

import { useMappedState } from './bindings'
import classes from './style.module.scss'

export interface IBetInfoProps extends React.HTMLAttributes<Element> {
  betIdx: number
  size?: string
}

const BetInfo: FC<IBetInfoProps> = ({ size = 'sm', betIdx }) => {
  const { eventSelName, eventMarket, eventName, isBankerActive } = useMappedState(betIdx)

  const rootClasses = classnames(classes.info, {
    [classes[`info--size_${size}`]]: size,
  })

  return (
    <div className={rootClasses}>
      <span className={classnames(classes.title, classes.break)}>
        <strong data-test={dt.value('selection__market-type')}>{`${eventMarket}: `}</strong>
        <strong data-test={dt.value('selection__market-name')}>{eventSelName}</strong>
      </span>
      {isBankerActive && (
        <span className={classes.break}>
          <IconBanker className={classes.banker} />
        </span>
      )}
      <span className={classes.descr} data-test={dt.value('selection__event-name')}>
        {eventName}
      </span>
    </div>
  )
}

export default memo(BetInfo)
