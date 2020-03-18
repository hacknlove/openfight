import React from 'react'

const translations = {
  additionalInformationUrl: '/informacion-adicional',
  updateSymptomsUrl: '/update-symptoms',
  HelpNotImproved () {
    return (
      <>
        <h3 className="subtitle">Tú diagnóstico básico:</h3>
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
