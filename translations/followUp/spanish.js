import React from 'react'

const translations = {
  followUpTitle: 'Tu diagnóstico básico:',
  additionalInformationUrl: '/informacion-adicional',
  updateSymptomsUrl: '/update-symptoms',
  levels: {
    VeryLow: 'Muy bajo',
    Low: 'Bajo',
    Moderate: 'Moderadp',
    High: 'Alto'
  },
  extended: {
    VeryLow: 'Very Low',
    Low: 'Low',
    Moderate: 'Moderate',
    High () {
      return (
        <>
          <h3 className="subtitle">Es altamente probable que tengas COVID-19</h3>
          <ol className="helpSteps">
            <li><strong>Debes llamar inmediatamente a las autoridades sanitarias y seguir sus indicaciones.</strong></li>
            <li>No salgas de casa y evita el contacto con el resto de personas.</li>
          </ol>
        </>
      )
    }
  },
  HelpNotImproved () {
    return (
      <>
        <h3 className="subtitle">Información importante sobre el diagnóstico:</h3>
        <ol className="helpSteps">
          <li>Este diagnóstico solo se basa en los síntomas que has indicado.</li>
          <li><strong>Puedes mejorar el diagnóstico aportando información adicional como edad o género.</strong></li>
          <li>Otra forma de mejorar el diagnóstico es el seguimiento anónimo. Actualiza periódicamente tus síntomas para obtener un diagnóstico más preciso.</li>
          <li>Además estarás ayudando a mejorar los modelos estadísticos y de deep learning con los que se combate la pandemia.</li>
        </ol>
      </>
    )
  },
  additionalInformation: 'Información adicional',
  updateSymptoms: 'Actualizar síntomas'
}

export default translations
