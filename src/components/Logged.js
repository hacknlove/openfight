import React from 'react'
import copy from 'copy-text-to-clipboard'
import { authenticatedFetch } from '../lib/fetch'
import { useRouter } from 'next/router'

export default function Nav ({ userCode }) {
  const router = useRouter()
  async function renovarContraseña () {
    const response = await authenticatedFetch('renovarPassword', {
      method: 'POST'
    })
    if (response.data && response.data.ok) {
      copy(`userCode: ${userCode} password: ${response.data.password}`)
      alert('Contraseña renovada y copiada al portapapeles. Todas las demás sesiones cerradas')
    } else {
      alert('Error renovando contraseña.')
    }
  }

  async function copiarAlPortapapeles () {
    const response = await authenticatedFetch('copiarPassword', {
      method: 'GET'
    })
    if (response.data && response.data.ok) {
      copy(`userCode: ${userCode} password: ${response.data.password}`)
      alert('Contraseña copiada al portapapeles')
    } else {
      alert('Error copiando contraseña.')
    }
  }

  async function cerrarSesion () {
    const response = await authenticatedFetch('salir', {
      method: 'POST'
    })
    if (response.data && response.data.ok) {
      router.push('/')
    } else {
      alert('Error saliendo')
    }
  }

  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            Seguimiento
          </h1>
          <h2 className="subtitle">
            Totalmente anónimo y seguro
          </h2>
          <form className="is-horizontal">
            <div className="field">
              <label className="label">Código anónimo</label>
              <div className="control has-icons-left">
                <input className="input" type="username" placeholder="Código de usuario" readOnly value={userCode}/>
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Contraseña</label>
              <div className="control has-icons-left">
                <input readOnly className="input" type="password" placeholder="Contraseña" value="contraseña" />
                <span className="icon is-small is-left">
                  <i className="fas fa-asterisk" />
                </span>
              </div>
            </div>
          </form>
          <div className="buttons">
            <button onClick={renovarContraseña} type="button" className="button is-black">Renovar contraseña </button>
            <button onClick={copiarAlPortapapeles} type="button" className="button is-black">Copiar al portapapeles </button>
            <button onClick={cerrarSesion} type="button" className="button is-black">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </section>

  )
}
