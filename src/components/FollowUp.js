import React, { useEffect } from 'react'
import Logged from '../components/Logged'
import Link from 'next/link'
import Hero from './Hero'
import clsx from 'clsx'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function HistorialAnonimo ({ data, translations, currentView, dataLocale }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  console.log(data)

  const symptoms = data.data.symptoms
  const diagnosis = data.data.diagnosis
  const Extended = translations.extended[diagnosis.label]

  return (
    <>
      <Hero translations={translations} currentView={currentView}/>
      <div className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-baseline">
              <div className="tile is-child notification is-light">
                {
                  data.me.additionalInformation
                    ? (
                      <>
                        <translations.HelpImproved />
                        <Link href={translations.additionalInformationUrl}>
                          <button className="button is-black is-large">{translations.yourAdditionalInformationUrl}</button>
                        </Link>
                      </>
                    )
                    : (
                      <>
                        <translations.HelpNotImproved />
                        <Link href={translations.additionalInformationUrl}>
                          <button className="button is-black is-large">{translations.additionalInformation}</button>
                        </Link>
                      </>
                    )
                }
              </div>
            </div>

            <div className="tile is-parent is-baseline">
              <div className="tile is-child box">
                <h2 className="subtitle">{data.me.additionalInformation ? translations.followUpTitleExtended : translations.followUpTitleBasic}</h2>
                <h1 className="title">{(diagnosis.value * 100).toFixed(2)}% - {translations.levels[diagnosis.label]}</h1>
                <progress className={clsx('progress', 'is-large', {
                  'is-success': diagnosis.label === 'VeryLow',
                  'is-info': diagnosis.label === 'Low',
                  'is-warning': diagnosis.label === 'Moderate',
                  'is-danger': diagnosis.label === 'High'
                })} value={diagnosis.value} max="1">{(diagnosis.value * 100).toFixed(2)}%</progress>
                <div className={clsx('notification', {
                  'is-success': diagnosis.label === 'VeryLow',
                  'is-info': diagnosis.label === 'Low',
                  'is-warning': diagnosis.label === 'Moderate',
                  'is-danger': diagnosis.label === 'High'
                })}>
                  <Extended />
                </div>

                <div className="notification has-background-grey-lighter">
                  <p>
                    {formatDistanceToNow(new Date(data.data.date), { locale: dataLocale })}
                  </p>
                  <h2 className="subtitle">{translations.SymptomsTitle}</h2>
                  <div className="field is-grouped is-grouped-multiline">
                    {
                      Object.entries(symptoms).filter(([symptom, value]) => value !== 'NotAnswer').map(([symptom, value]) => (
                        <div key={symptom} className="control">
                          <div className="tags has-addons">
                            <span className="tag is-medium ">{translations.symptoms[symptom]}</span>
                            <span className="tag is-medium ">{translations.symptoms.options[value]}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <Link href={translations.updateSymptomsUrl}>
                  <button className="button is-black is-large">{translations.updateSymptoms}</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Logged userCode={data.me.userCode} translations={translations} />
    </>
  )
}
