import React from 'react'

const translations = {
  title: 'openFight - diagnóstico',
  updateSymptomsTitle: 'ACtualizar síntomas:',
  Help () {
    return (
      <>
        <h3 className="subtitle">Mejor diagnóstico</h3>
        <ol className="helpSteps">
          <li>Actualiza tus síntomas tantas veces como quieras. Más de una vez al día si te parece necesario.</li>
          <li><strong>Si estás infectado, actualiza tus síntomas al menos una vez al día.</strong></li>
          <li>Si no estás infectado, actualiza tus síntomas si ves que cambian.</li>
          <li>Cuantos más datos reunamos, mejores diagnósticos podremos hacer</li>
        </ol>
      </>
    )
  },
  additionalInformation: 'Información adicional',
  updateSymptoms: 'Actualizar síntomas'
}

export default translations
