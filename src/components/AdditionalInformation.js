import React, { useEffect, useState } from 'react'
import Logged from './Logged'
import Hero from './Hero'
import Control from './Control'
import Alerts from './Alerts'

import additionalInformation from '../../config/additionalInformation'
import useControlledForm from '../lib/useControlledForm'
import { authenticatedFetch } from '../lib/fetch'
import { useRouter } from 'next/router'

const fields = {}

additionalInformation.forEach(symptom => {
  fields[symptom.name] = {}
})

export default function HistorialAnonimo ({ data, translations, currentView }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const {
    handleSubmit,
    setInput,
    getValue
  } = useControlledForm({
    fields
  })

  async function onSubmit (json) {
    setIsLoading(true)
    const response = await authenticatedFetch('additional', {
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  {additionalInformation.map(control => (
                    <div key={control.name} className="field">
                      <Control control={control} getValue={getValue} setInput={setInput} translations={translations.additionalInformation} />
                    </div>
                  ))}
                  <hr />
                  <button className="button is-black is-large" type="submit">{translations.Next}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Logged userCode={data.me.userCode} translations={translations} />
    </>
  )
}
