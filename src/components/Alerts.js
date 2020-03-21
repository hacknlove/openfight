import React, { useState } from 'react'
import clsx from 'clsx'

let alerts = []

function Alert ({ date, text, refresh, className }) {
  function remove () {
    alerts = alerts.filter(alert => alert.date !== date)
    refresh()
  }

  setTimeout(remove, 10000)

  return (
    <article className={clsx('message', className)}>
      <div className="message-header">
        <p>{text}</p>
        <button onClick={remove} className="delete" aria-label="delete"></button>
      </div>
    </article>

  )
}

export default function Alerts () {
  const [date, setUpdate] = useState(Date.now())

  Alerts.addAlert = (text, className = '') => {
    const alert = { date, text, className }
    alerts.push(alert)
    setUpdate(Date.now())
    return {
      alert,
      delete () {
        alerts = alerts.filter(alert => alert.date !== date)
        setUpdate(Date.now())
      },
      refresh () {
        setUpdate(Date.now())
      }
    }
  }

  if (!alerts.length) {
    return null
  }

  return (
    <>
      <div id="alerts">
        {alerts.map(a => (
          <React.Fragment key={a.date}>
            <Alert
              text={a.text}
              date={a.date}
              className={a.className}
              refresh={() => setUpdate(Date.now())}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}
