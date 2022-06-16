import React from 'react'

import { i18n } from '@mplatform/i18n'
import NotAvailableIcon from 'root/assets/assets-svg-sprite/lib/ui/icon-not-available.svg'

import classes from './style.module.scss'

const InactiveStub = () => {
  return (
    <div className={classes.row}>
      <NotAvailableIcon className={classes.icon} width={30} height={30} />
      <span className={classes.note}>{i18n.value('betslip.stub.inactive_selection.text')}</span>
    </div>
  )
}

export default InactiveStub
