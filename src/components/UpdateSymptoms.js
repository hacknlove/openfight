import React, { useEffect, useState } from 'react'
import Logged from './Logged'
import Hero from './Hero'
import Symptoms from './Symptoms'
import { useRouter } from 'next/router'
import Alerts from './Alerts'
import { authenticatedFetch } from '../lib/fetch'

export default function UpdateSymptoms ({ data, translations, currentView }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  async function onSubmit (json) {
    setIsLoading(true)
    const response = await authenticatedFetch('update', {
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
              <div className="tile is-child notification is-light">
                <translations.Help />
              </div>
            </div>

            <div className="tile is-parent is-baseline">
              <div className="tile is-child box">
                <h2 className="subtitle">{translations.updateSymptomsTitle}</h2>
                <Symptoms defaultValues={data.data.symptoms} translations={translations} onSubmit={onSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Logged userCode={data.me.userCode} translations={translations} />
    </>
  )
}
