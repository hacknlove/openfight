import React from 'react'

const translations = {
  title: 'stop-COVID-19',
  subtitle: 'Herramienta anónima para el diagnóstico y la monitoriazión',
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
  },
  Syntoms: 'Síntomas',
  steps: [
    'No sabe/no contesta',
    'No',
    'Un poco',
    'Algo',
    'Bastante',
    'Mucho'
  ],
  symptoms: {
    fever: 'Fiebre',
    cough: 'Tos',
    mucus: 'Mocos',
    NasalCongestion: 'Congestión nasal',
    sneeze: 'Estornudos',
    soreThroat: 'Dolor de garganta',
    respiratoryDistress: 'Dificultad respiratoria',
    sputum: 'Flemas',
    vomit: 'Vomito',
    diarrhea: 'Diarrea',
    fatigue: 'Cansancio',
    lackOfAppetite: 'Falta de apetito'
  },
  Next: 'Siguiente',
  LoginTitle: 'Seguimiento',
  LoginSubtitle: 'Completamente anónimo y seguro',
  userCode: 'Código de usuario',
  password: 'Contraseña',
  Languages: 'Idiomas'

}

export default translations
