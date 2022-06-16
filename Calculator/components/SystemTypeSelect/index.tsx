import React, { FC, useMemo, memo, useCallback } from 'react'

import { i18n } from '@mplatform/i18n'
import { ButtonSelect } from 'root/scripts/deprecated-hub/form-ui-web'
import { useDeviceTag } from 'root/scripts/deprecated-hub/hooks-ui-web'
import { betConstants } from 'root/scripts/deprecated-hub/bet-core'

import classes from './style.module.scss'
import { useMappedState, useMappedActions } from './bindings'

const SystemTypeSelectRaw: FC<SystemTypeSelectProps> = (props) => {
  const { isSmall } = props
  const { betTypesOptions, betTypeKey } = useMappedState()
  const actions = useMappedActions()

  const { isMobileSm } = useDeviceTag()

  const handleSelectValue = useCallback((option) => {
    actions.updateBetType(option.value, betConstants.BET_TYPES_TABS.SYSTEM)
  }, [])

  const buttonSelectSize = useMemo(() => {
    return isSmall ? 'xs' : 'sm'
  }, [isSmall])

  const renderOption = useCallback(
    (option) => {
      if (isMobileSm) {
        return option.smallLabel
      } else {
        return option.label
      }
    },
    [isMobileSm],
  )

  return (
    <div className={classes.selector} data-test={dt.value('field__layout')}>
      <div className={classes.title} data-test={dt.value('field__label')}>
        {i18n.value('betslip.tabs.bet_type')}
      </div>

      {betTypesOptions && betTypesOptions.length && (
        <ButtonSelect
          isDisabled={betTypesOptions.length <= 1}
          className={classes.field}
          options={betTypesOptions}
          value={betTypeKey}
          isFirstSelected
          valueField="id"
          ppTitle={i18n.value('betslip.message.choose_bet_type')}
          onSelectOption={handleSelectValue}
          dataTest="bet-type"
          size={buttonSelectSize}
          renderContent={renderOption}
        />
      )}
    </div>
  )
}

interface SystemTypeSelectProps extends React.HTMLAttributes<Element> {
  isSmall?: boolean
}

export const SystemTypeSelect = memo(SystemTypeSelectRaw)
export default SystemTypeSelect
