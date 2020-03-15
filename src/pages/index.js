import React from 'react'
import Nav from '../components/nav'
import useControlledForm from '../lib/useControlledForm'
import { authenticatedFetch } from '../lib/fetch'
import { useRouter } from 'next/router'
import copy from 'copy-text-to-clipboard'

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

function Home ({ roles = ['anonymous'] }) {
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
    router.push(`/historial-anónimo/${response.me.userId}`)
  }

  return (
    <>
      <Nav roles={roles} />
      <div className="section">
        <h1 className="title">
          Stop COVID-19
        </h1>
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-baseline">
              <div className="tile is-child notification is-light">
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
              <div className="tile is-child box">
                <h2 className="subtitle">Síntomas</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Fiebre: {getValue('Fiebre')} {(getValue('Fiebre')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="Fiebre"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Tos: {getValue('Tos')} {(getValue('Tos')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="Tos"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Moco: {getValue('Moco')} {(getValue('Moco')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="Moco"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Congestión Nasal: {getValue('CongestiónNasal')} {(getValue('CongestiónNasal')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="CongestiónNasal"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Estornudos: {getValue('Estornudos')} {(getValue('Estornudos')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="Estornudos"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Dolor de garganta: {getValue('DolorDeGarganta')} {(getValue('DolorDeGarganta')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="DolorDeGarganta"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Dificultad para respirar: {getValue('DificultadParaRespirar')} {(getValue('DificultadParaRespirar')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="DificultadParaRespirar"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Flema: {getValue('Flema')} {(getValue('Flema')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="Flema"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Vomito: {getValue('Vomito')} {(getValue('Vomito')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="Vomito"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Diarrea: {getValue('Diarrea')} {(getValue('Diarrea')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="Diarrea"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Cansancio: {getValue('Cansancio')} {(getValue('Cansancio')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="Cansancio"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label htmlFor="terms"> Debilidad: {getValue('Debilidad')} {(getValue('Debilidad')) !== 'No sé' ? '%' : ''}</label>
                      <div className="slider">
                        <span>0%</span>
                        <input
                          className="slider is-fullwidth"
                          step="1"
                          min="0"
                          max="100"
                          type="range"
                          onChange={setInput}
                          name="Debilidad"
                        />
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <button className="button" type="submit">Diagnóstico</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
