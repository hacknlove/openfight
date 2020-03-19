import React, { useState, useEffect } from 'react'
import Login from '../components/Login'
import useControlledForm from '../lib/useControlledForm'
import { authenticatedFetch } from '../lib/fetch'
import { useRouter } from 'next/router'
import storage from '../lib/storage'
import symptoms from '../../config/symptoms.js'
import Hero from './Hero'
const fields = {}
const defaultValues = {}

symptoms.forEach(symptom => {
  fields[symptom.name] = {}
  defaultValues[symptom.name] = symptom.default
})

function Control ({ symptom, getValue, setInput, translations }) {
  switch (symptom.type) {
    case 'steps': {
      return (
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
      )
    }
    case 'select': {
      return (
        <>
          <label> {translations.symptoms[symptom.name]}:</label>
          <div className="control">

            <div className="select">
              <select
                name={symptom.name}
                onChange={setInput}
                value={getValue(symptom.name)}
              >
                {
                  symptom.options.map(option => (
                    <option key={option} value={option}>{translations.options[option]}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </>
      )
    }
    default: {
      return (<p>{translations.symptoms[symptom.name]}</p>)
    }
  }
}

export default function Index ({ translations, currentView }) {
  const [isLoaing, setIsLoading] = useState(true)
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
    router.push(translations.followUpUrl)
  }

  useEffect(() => {
    authenticatedFetch('last').then((res) => {
      if (!res.me || !res.me.userCode) {
        setIsLoading(false)
        return
      }
      storage.set('/followUp', res)
      router.push(translations.followUpUrl)
    })
  }, [])

  return (
    <>
      { isLoaing ? <div id="loader" /> : null}
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
                <h2 className="subtitle">{translations.Syntoms}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {symptoms.map(symptom => (
                    <div key={symptom.name} className="field">
                      <Control symptom={symptom} getValue={getValue} setInput={setInput} translations={translations} />
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
      <Login translations={translations}/>
    </>
  )
}
