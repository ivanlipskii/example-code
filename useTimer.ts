import { useLayoutEffect, useState } from 'react'
import uniqueId from 'lodash/uniqueId'
import forEach from 'lodash/forEach'
import round from 'lodash/round'

const MILLISECONDS_IN_SECOND = 1000

const subscribes: { [key: string]: VoidFunction } = {}
let timerId
let currentTimerTime

const tick = (): void => {
  const currentDate = new Date()
  const currentMilliseconds = currentDate.getMilliseconds()
  const millisecondsBeforeNextSecond = MILLISECONDS_IN_SECOND - currentMilliseconds
  currentTimerTime = round(currentDate.getTime(), -3)

  timerId = setTimeout(() => {
    tick()

    forEach(subscribes, (subscribeCallback) => {
      subscribeCallback()
    })
  }, millisecondsBeforeNextSecond)
}

const subscribe = (callbackId: string, callback: typeof subscribes[string]): void => {
  subscribes[callbackId] = callback

  if (Object.keys(subscribes).length === 1) {
    tick()
  }
}

const unsubscribe = (callbackId: string): void => {
  delete subscribes[callbackId]

  if (Object.keys(subscribes).length === 0) {
    clearTimeout(timerId)
    currentTimerTime = 0
  }
}

export const useTimer = (displayTime: number, condition: boolean | undefined = true): number => {
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useLayoutEffect(() => {
    if (condition) {
      let currentTime

      if (currentTimerTime) {
        currentTime = currentTimerTime
      } else {
        const currentDate = new Date()
        currentTime = currentDate.getTime()
      }

      const timeBeforeEvent = displayTime - round(currentTime, -3)

      if (timeBeforeEvent > 0) {
        const callbackId = uniqueId('callback_')
        setTimeLeft(timeBeforeEvent)

        subscribe(callbackId, () => {
          const timeLeft = displayTime - currentTimerTime

          if (timeLeft > 0) {
            setTimeLeft(timeLeft)
          } else {
            setTimeLeft(0)
            unsubscribe(callbackId)
          }
        })

        return (): void => {
          setTimeLeft(0)
          unsubscribe(callbackId)
        }
      }
    }
  }, [displayTime, condition])

  return timeLeft
}

export default useTimer
