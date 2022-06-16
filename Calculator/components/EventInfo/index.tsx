import React, { FC, memo } from 'react'
import cn from 'classnames'

import classes from './styles.module.scss'

export const EventInfoRaw: FC<EventInfoProps> = (props) => {
  const { selName, marketName, eventName, className, dataTest, isRelated = false, isDeleted = false } = props

  const infoClasses = cn(classes.info, className, {
    [classes.infoDeleted]: isDeleted,
    [classes.infoRelated]: isRelated,
  })

  return (
    <div className={infoClasses} data-test={dt.value('EventInfo', dataTest)}>
      <div className={classes.topPart}>
        {isRelated && <div className={classes.screamer}>!</div>}
        <h3 className={classes.title} data-test={dt.value('EventInfo__title', dataTest)}>
          {marketName}: {selName}
        </h3>
      </div>
      <p className={classes.descr} data-test={dt.value('EventInfo__descr', dataTest)}>
        {eventName}
      </p>
    </div>
  )
}

export interface EventInfoProps {
  selName: string
  marketName: string
  eventName: string
  dataTest?: string
  className?: string
  isRelated?: boolean
  isDeleted?: boolean
}

export const eventInfoClasses = classes
export const EventInfo = memo(EventInfoRaw)
export default EventInfo
