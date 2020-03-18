import React, { useEffect } from 'react'
import Login from '../components/Login'
import useControlledForm from '../lib/useControlledForm'
import { authenticatedFetch } from '../lib/fetch'
import { useRouter } from 'next/router'
import storage from '../lib/storage'
import symptoms from '../config/symptoms.js'
import LanguagePicker from './LanguagePicker'

const fields = {}
const defaultValues = {}

symptoms.forEach(symptom => {
  fields[symptom.name] = {}
  defaultValues[symptom.name] = symptom.default
})

export default function Index ({ translations, currentLanguage }) {
  const {
    handleSubmit,
    setInput,
    getValue
  } = useControlledForm({
    fields,
    defaultValues
  })
  const router = useRouter()
  async function onSubmit (json) {
    const response = await authenticatedFetch('new', {
      method: 'POST',
      json
    })
    storage.set('/followUp', response)
    router.push('/followUp')
  }

  useEffect(() => {
    authenticatedFetch('last').then((res) => {
      if (!res.me || !res.me.userCode) {
        return
      }
      storage.set('/followUp', res)
      router.push('/followUp')
    })
  }, [])

  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <p id="openSourceDataInnovation">
              <a href="https://github.com/hacknlove/stopCovid19" target="_blank" rel="noopener noreferrer">OpenSource</a><br /><a href="https://stopcovid19.s3.eu-west-3.amazonaws.com/csv/data.csv" target="_blank" rel="noopener noreferrer">OpenData</a><br /><a href="https://spectrum.chat/stopcovid19?tab=posts" target="_blank" rel="noopener noreferrer">OpenInnovation</a>
            </p>
            <br />
            <LanguagePicker translations={translations} currentLanguage={currentLanguage} />
            <h1 className="title">
              {translations.title}
            </h1>
            <h2 className="subtitle">
              {translations.subtitle}
            </h2>
          </div>
        </div>
      </section>
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
                <h2 className="subtitle">{translations.Syntoms}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {symptoms.map(symptom => {
                    switch (symptom.type) {
                      case 'steps': {
                        return (
                          <div key={symptom.name} className="field">
                            <div className="control">
                              <label> {translations.symptoms[symptom.name]}: {translations.steps[+getValue(symptom.name) + 1]}</label>
                              <div className="slider">
                                <input
                                  className="slider is-fullwidth"
                                  step="1"
                                  min="-1"
                                  max="4"
                                  type="range"
                                  onChange={setInput}
                                  name={symptom.name}
                                  value={getValue(symptom.name)}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      }
                      default: {
                        return (<p>{translations.symptoms[symptom.name]}</p>)
                      }
                    }
                  })}
                  <hr />
                  <button className="button is-black is-large" type="submit">{translations.Next}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Login translations={translations}/>
    </>
  )
}
