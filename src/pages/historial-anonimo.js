import React from 'react'
import Logged from '../components/Logged'
import storage from '../lib/storage'
import isometricFetch from '../lib/isometricFetch'
import redirect from 'next-redirect'
import Link from 'next/link'
export default function HistorialAnonimo ({ data }) {
  return (
    <>
      <Logged userCode={data.me.userCode} />
      <div className="section">
        <h1 className="title">
          Stop COVID-19
        </h1>
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-baseline">
              <div className="tile is-child notification is-light">
                <h3 className="subtitle">Último diagnóstico:</h3>
                <ol className="helpSteps">
                  <li>Aquí tienes el resultado de tu último diagnóstico.</li>
                  <li>El diagnóstico es más eficaz si actualizas tu evolución con la periodicidad indicada.</li>
                  <li><strong>Actualiza también tu evolución si se producen cambios significativos en tu estado.</strong></li>
                  <li>Usa tu código de usuario y tu contraseña para acceder a tu historial anónimo desde otro dispositivo o navegador.</li>
                  <li><strong>Para un diagnóstico más preciso, haz click el botón ampliar precisión.</strong></li>
                </ol>
                <Link href="/ampliar-precision">
                  <button className="button is-black is-large">Ampliar Precisión</button>
                </Link>
              </div>
            </div>

            <div className="tile is-parent is-baseline">
              <div className="tile is-child box">
                <h2 className="subtitle">Síntomas</h2>
                <pre>
                  {JSON.stringify(data, null, 4)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

HistorialAnonimo.getInitialProps = async function getHistorialAnonimo (ctx) {
  let data

  if (typeof window !== 'undefined') {
    data = storage.get('/historial-anonimo')
  }
  data = data || await isometricFetch(ctx, 'ultimo-diagnostico')

  if (!data.me || !data.me.userCode) {
    redirect(ctx, '/')
  }

  return { data }
}
