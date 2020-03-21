import React, { useState } from 'react'
import Login from '../components/Login'
import { authenticatedFetch } from '../lib/fetch'
import { useRouter } from 'next/router'
import Hero from './Hero'
import Alerts from './Alerts'
import Symptoms from './Symptoms'

export default function Index ({ translations, currentView }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit (json) {
    setIsLoading(true)
    const response = await authenticatedFetch('new', {
      method: 'POST',
      json
    })
    if (response.data.error) {
      setIsLoading(false)
      return Alerts.addAlert(translations.errors[response.error] || translations.errors.unknown, 'is-danger is-large')
    }
    router.push(translations.followUpUrl)
  }

  return (
    <>
      { isLoading ? <div id="loader" /> : null}
      <Hero translations={translations} currentView={currentView}/>
      <div className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-baseline">
              <div className="tile is-child notification has-background-light">
                <translations.HelpIndex />
              </div>
            </div>

            <div className="tile is-parent is-baseline">
              <div className="tile is-child box is-primary">
                <h2 className="subtitle">{translations.Symptoms}</h2>
                <Symptoms translations={translations} onSubmit={onSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Login translations={translations}/>
    </>
  )
}
