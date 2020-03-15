import React, { useEffect } from 'react'
import Login from '../components/Login'
import useControlledForm from '../lib/useControlledForm'
import { authenticatedFetch } from '../lib/fetch'
import { useRouter } from 'next/router'
import storage from '../lib/storage'

const fields = {
  Fiebre: {},
  Tos: {},
  Moco: {},
  CongestiónNasal: {},
  Estornudos: {},
  DolorDeGarganta: {},
  DificultadParaRespirar: {},
  Flema: {},
  Vomito: {},
  Diarrea: {},
  Cansancio: {},
  Debilidad: {}
}

const defaultValues = {
  Fiebre: 'No sé',
  Tos: 'No sé',
  Moco: 'No sé',
  CongestiónNasal: 'No sé',
  Estornudos: 'No sé',
  DolorDeGarganta: 'No sé',
  DificultadParaRespirar: 'No sé',
  Flema: 'No sé',
  Vomito: 'No sé',
  Diarrea: 'No sé',
  Cansancio: 'No sé',
  Debilidad: 'No sé'
}

const sliders = [
  {
    label: 'Fiebre',
    name: 'Fiebre'
  },
  {
    label: 'Tos',
    name: 'Tos'
  },
  {
    label: 'Moco',
    name: 'Moco'
  },
  {
    label: 'Congestión Nasal',
    name: 'CongestiónNasal'
  },
  {
    label: 'Estornudos',
    name: 'Estornudos'
  },
  {
    label: 'Dolor de garganta',
    name: 'DolorDeGarganta'
  },
  {
    label: 'Dificultad para respirar',
    name: 'DificultadParaRespirar'
  },
  {
    label: 'Flema',
    name: 'Flema'
  },
  {
    label: 'Vomito',
    name: 'Vomito'
  },
  {
    label: 'Diarrea',
    name: 'Diarrea'
  },
  {
    label: 'Cansancio',
    name: 'Cansancio'
  },
  {
    label: 'Debilidad',
    name: 'Debilidad'
  }
]

export default function Home ({ roles = ['anonymous'] }) {
  const {
    handleSubmit,
    setInput,
    getValue
  } = useControlledForm({
    fields,
    defaultValues,
    context: 0
  })
  const router = useRouter()
  async function onSubmit (json) {
    const response = await authenticatedFetch('nuevo-diagnostico', {
      method: 'POST',
      json
    })
    storage.set('/historial-anonimo', response)
    router.push('/historial-anonimo')
  }

  useEffect(() => {
    authenticatedFetch('ultimo-diagnostico').then((res) => {
      if (!res.me || !res.me.userCode) {
        return
      }
      storage.set('/historial-anonimo', res)
      router.push('/historial-anonimo')
    })
  }, [])

  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              stop-COVID-19
            </h1>
            <h2 className="subtitle">
              Herramienta de diagnóstico avanzado
            </h2>
          </div>
        </div>
      </section>
      <div className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-baseline">
              <div className="tile is-child notification has-background-light">
                <h3 className="subtitle">Diagnóstico:</h3>
                <ol className="helpSteps">
                  <li>Rellena este formulario para saber si tus síntomas se corresponden con el coronavirus.</li>
                  <li><strong>Este sistema experto automatizado que no sustituye ni remplaza un diagnóstico profesional, solo debe ser utilizado a modo orientativo.</strong></li>
                  <li>No es necesario rellenar todos los datos, pero cuanta mayor información proporciones más acertado será el diagnóstico.</li>
                  <li>El diagnóstico es totalmente anónimo.</li>
                </ol>
              </div>
            </div>

            <div className="tile is-parent is-baseline">
              <div className="tile is-child box is-primary">
                <h2 className="subtitle">Síntomas</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {sliders.map(field => (
                    <div key={field.name} className="field">
                      <div className="control">
                        <label htmlFor="terms"> {field.label}: {getValue(field.name)} {(getValue(field.name)) !== 'No sé' ? '%' : ''}</label>
                        <div className="slider">
                          <span>0%</span>
                          <input
                            className="slider is-fullwidth"
                            step="1"
                            min="0"
                            max="100"
                            type="range"
                            onChange={setInput}
                            name={field.name}
                          />
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr />
                  <button className="button is-black is-large" type="submit">Diagnóstico</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Login/>
    </>
  )
}
