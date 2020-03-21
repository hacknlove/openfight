import React from 'react'

const translations = {
  title: 'OpenFight - Inicio',
  followUpUrl: '/seguimiento',
  HelpIndex () {
    return (
      <>
        <h3 className="subtitle">Leer atentamente:</h3>
        <ol className="helpSteps">
          <li>Rellena este formulario para saber si tus síntomas se corresponden con los del coronavirus.</li>
          <li><strong>Este sistema experto automatizado que no sustituye ni remplaza un diagnóstico profesional, solo debe ser utilizado a modo orientativo.</strong></li>
          <li>No es necesario rellenar todos los datos, pero cuanta mayor información proporciones más acertado será el diagnóstico.</li>
          <li>El diagnóstico es totalmente anónimo.</li>
        </ol>
      </>
    )
  }
}

export default translations
