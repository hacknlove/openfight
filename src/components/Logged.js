import React from 'react'
import copy from 'copy-text-to-clipboard'
import { authenticatedFetch } from '../lib/fetch'
import { useRouter } from 'next/router'

export default function Nav ({ userCode, translations }) {
  const router = useRouter()
  async function renovarContraseña () {
    const response = await authenticatedFetch('renovarPassword', {
      method: 'POST'
    })
    if (response.data && response.data.ok) {
      copy(`userCode: ${userCode} password: ${response.data.password}`)
      alert('La nueva contraseña ha sido copiada al portapapeles')
    } else {
      alert(translations.Error)
    }
  }

  async function logout () {
    const response = await authenticatedFetch('logout', {
      method: 'POST'
    })
    if (response.data && response.data.ok) {
      router.push('/')
    }
  }

  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{translations.LoginTitle}</h1>
          <h2 className="subtitle">{translations.LoginSubtitle}</h2>
          <form className="is-horizontal">
            <div className="field">
              <label className="label">{translations.userCode}</label>
              <div className="control has-icons-left">
                <input className="input" type="username" placeholder="Código de usuario" readOnly value={userCode}/>
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">{translations.password}</label>
              <div className="control has-icons-left">
                <input readOnly className="input" type="password" placeholder="Contraseña" value="contraseña" />
                <span className="icon is-small is-left">
                  <i className="fas fa-asterisk" />
                </span>
              </div>
            </div>
          </form>
          <div className="buttons">
            <button onClick={renovarContraseña} type="button" className="button is-black">{translations.GetNewPassword}</button>
            <button onClick={logout} type="button" className="button is-black">{translations.LogOut}</button>
          </div>
        </div>
      </div>
    </section>

  )
}
