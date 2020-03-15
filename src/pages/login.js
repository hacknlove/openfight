import React from 'react'
import Login from '../components/Login'
import useCredentials from '../lib/useCredentials'
import useCredentialsRedirect from '../lib/useCredentialsRedirect'
import { withRedux } from '../lib/redux'
import { loginWithEmail } from '../lib/redux/actions/credentials'
import getInitialPropsMe from '../lib/getInitialPropsMe'
import { useDispatch } from 'react-redux'

const credentialsConfiguration = {
  login: true
}

function LogInPage () {
  const credentials = useCredentials()
  const dispatch = useDispatch()

  if (useCredentialsRedirect(credentials, credentialsConfiguration)) {
    return null
  }

  function logIn (data) {
    loginWithEmail(dispatch, data)
  }

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <Login
                logIn={logIn}
                context={credentials}
              />


<h2 className="subtitle">Registro anónimo</h2>

<div className="field">
  <label className="label">Nombre de usuario</label>
  <div className="control">
    <input className="input" name="username" value={getValue('username')} onChange={setInput} type="text" placeholder="Text input" />
  </div>
</div>
<div className="field">
  <label className="label">Contraseña</label>
  <div className="control">
    <input className="input" name="password" value={getValue('password')} onChange={setInput} type="text" placeholder="Text input" />
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default withRedux(LogInPage, { ssr: true })

LogInPage.getInitialProps = getInitialPropsMe(credentialsConfiguration)
