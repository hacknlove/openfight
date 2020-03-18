import React from 'react'
import useControlledForm from '../lib/useControlledForm'
import clsx from 'clsx'
import { unAuthenticatedFetch } from '../lib/fetch'
import { useRouter } from 'next/router'

export default function Login ({ translations }) {
  const fields = {
    username: {
      rule (value) {
        if (!value) {
          return 'Introduce tu código anónimo'
        }
        if (!value.match(/^...-...-...$/)) {
          return 'xxx-xxx-xxx'
        }
      }
    },
    password: {
      rule (value) {
        return !value && 'Introduce tu contraseña'
      }
    }
  }
  const { handleSubmit, hasErrors, errors, setInput, getValue, setErrors } = useControlledForm({
    fields
  })

  const router = useRouter()

  async function onSubmit (data) {
    const response = await unAuthenticatedFetch('login', {
      method: 'POST',
      json: data
    })
    if (response.data && response.data.ok) {
      return router.push('/followUp')
    }
    setErrors({
      username: 'Código anónimo no encontrado',
      password: 'O contraseña errónea'
    })
  }

  return (

    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{translations.LoginTitle}</h1>
          <h2 className="subtitle">{translations.LoginSubtitle}</h2>
          <form className="is-horizontal" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">{translations.userCode}</label>
              <div className="control has-icons-left">
                <input
                  className={clsx('input', errors.username && 'is-danger')}
                  value={getValue('username')}
                  onChange={setInput}
                  name="username"
                  type="text"
                  placeholder="Código de usuario"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </div>
              {
                errors.username && <p className="help is-danger">{errors.username}</p>
              }
            </div>
            <div className="field">
              <label className="label">{translations.password}</label>
              <div className="control has-icons-left">
                <input
                  className={clsx('input', errors.password && 'is-danger')}
                  value={getValue('password')}
                  onChange={setInput}
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-asterisk" />
                </span>
              </div>
              {
                errors.password && <p className="help is-danger">{errors.password}</p>
              }
            </div>
            <div className="field">
              <label className="label">&nbsp;</label>
              <button disabled={hasErrors} className="button is-black">
                Entrar {hasErrors}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

  )
}
