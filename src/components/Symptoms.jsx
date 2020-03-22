import React from 'react'
import symptoms from '../../config/symptoms'
import useControlledForm from '../lib/useControlledForm'
import Control from './Control'

const fields = {}

symptoms.forEach(symptom => {
  fields[symptom.name] = {}
})

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
      {symptoms.map(control => (
        <div key={control.name} className="field">
          <Control control={control} getValue={getValue} setInput={setInput} translations={translations.symptoms} />
        </div>
      ))}
      <hr />
      <button className="button is-black is-large" type="submit">{translations.Next}</button>
    </form>
  )
}
