import React from 'react'

const translations = {
  title: 'openFight - diagnóstico',
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
    VeryLow () {
      return (
        <>
          <h3 className="subtitle">Parece que no tienes COVID-19</h3>
          <ol className="helpSteps">
            <li><strong>Pero podrías estar incubándolo, así que actualiza tus síntomas si los síntomas cambian.</strong></li>
            <li>No salgas de casa a no ser que sea estrictamente necesario, porque podrías contagiarte.</li>
            <li>Espera hasta que las autoridades indiquen que el riesgo es bajo.</li>
          </ol>
        </>
      )
    },
    Low () {
      return (
        <>
          <h3 className="subtitle">Podrías tener un COVID-19 leve</h3>
          <ol className="helpSteps">
            <li><strong>Parece que no tienes COVID-19, pero podrías tenerlo y que te afecte poco.</strong></li>
            <li>Por favor, permanece en casa para minimizar el riesgo de infectarte o infectar a otros.</li>
            <li>Actualiza tus síntomas si cambian.</li>
          </ol>
        </>
      )
    },
    Moderate () {
      return (
        <>
          <h3 className="subtitle">Puede que tengas COVID-19</h3>
          <ol className="helpSteps">
            <li><strong>Por favor, llama a las autoridades sanitarias para obtener más instrucciones.</strong></li>
            <li>En cualquier caso, quédate en casa y evita el contacto con otras personas</li>
            <li>Actualiza tus síntomas si cambian.</li>
          </ol>
        </>
      )
    },
    High () {
      return (
        <>
          <h3 className="subtitle">Es altamente probable que tengas COVID-19</h3>
          <ol className="helpSteps">
            <li><strong>Debes llamar inmediatamente a las autoridades sanitarias y seguir sus indicaciones.</strong></li>
            <li>No salgas de casa y evita el contacto con el resto de personas.</li>
            <li>Actualiza tus síntomas si cambian.</li>
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
