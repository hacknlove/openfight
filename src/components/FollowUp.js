import React, { useEffect } from 'react'
import Logged from '../components/Logged'
import Link from 'next/link'
import Hero from './Hero'

export default function HistorialAnonimo ({ data, translations, currentView }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <>
      <Hero translations={translations} currentView={currentView}/>
      <div className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-baseline">
              <div className="tile is-child notification is-light">
                <translations.HelpNotImproved />
                <Link href={translations.additionalInformationUrl}>
                  <button className="button is-black is-large">{translations.additionalInformation}</button>
                </Link>
                <br />
                <br />
                <Link href={translations.updateSymptomsUrl}>
                  <button className="button is-black is-large">{translations.updateSymptoms}</button>
                </Link>
              </div>
            </div>

            <div className="tile is-parent is-baseline">
              <div className="tile is-child box">
                <h2 className="subtitle">Síntomas</h2>
                <pre>
                  {JSON.stringify(data, null, 4)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Logged userCode={data.me.userCode} translations={translations} />
    </>
  )
}
