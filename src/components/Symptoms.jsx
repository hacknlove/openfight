import React from 'react'
import symptoms from '../../config/symptoms'
import useControlledForm from '../lib/useControlledForm'

const fields = {}

symptoms.forEach(symptom => {
  fields[symptom.name] = {}
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

export default function Symptoms ({ onSubmit, translations, defaultValues }) {
  const {
    handleSubmit,
    setInput,
    getValue
  } = useControlledForm({
    fields,
    defaultValues
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {symptoms.map(symptom => (
        <div key={symptom.name} className="field">
          <Control symptom={symptom} getValue={getValue} setInput={setInput} translations={translations} />
        </div>
      ))}
      <hr />
      <button className="button is-black is-large" type="submit">{translations.Next}</button>
    </form>
  )
}
