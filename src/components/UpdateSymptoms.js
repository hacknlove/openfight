import React, { useEffect } from 'react'
import Logged from './Logged'
import Hero from './Hero'
import Symptoms from './Symptoms'

export default function UpdateSymptoms ({ data, translations, currentView }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  function onSubmit (data) {
    console.log(data)
  }

  return (
    <>
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
