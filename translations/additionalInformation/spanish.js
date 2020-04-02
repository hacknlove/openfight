import React from 'react'

const translations = {
  title: 'openFight - Información adicional',
  followUpTitle: 'Tu información adicional:',
  followUpUrl: '/seguimiento',
  additionalInformation: {
    zip: 'Código postal',
    year: 'Año de nacimiento',
    gender: 'Sexo biológico',
    medicalConditions: 'Problemas médicos',
    bloodType: 'Tipo sanguineo',
    options: {
      'A+': 'A+',
      'A-': 'A-',
      'AB+': 'AB+',
      'AB-': 'AB-',
      'B+': 'B+',
      'B-': 'B-',
      'O+': 'O+',
      'O-': 'O-',
      asthma: 'Asma',
      diabetics: 'Diabetes',
      hypertension: 'Hipertensión',
      immunodeficiency: 'Inmunodeficiencia',
      'heart disease': 'Problemas cardiacos',
      'renal problems': 'Problemas renales',
      'liver problems': 'Problemas hepáticos',
      apnea: 'Apnea',
      masculine: 'Masculino',
      femenine: 'Femenino'
    }
  },
  Help () {
    return (
      <>
        <h3 className="subtitle">Información importante sobre el diagnóstico</h3>
        <ol className="helpSteps">
          <li>Este diagnóstico sólo se basa en los síntomas que has indicado.</li>
          <li><strong>Puedes mejorar el diagnóstico incluyendo información adicional como la edad o el género.</strong></li>
          <li>Otra manera de mejorar el diagnóstico es mediante el seguimiento anónimo. Actualiza tus síntomas de forma periódica para un diagnóstico más preciso.</li>
          <li>Además, estarás ayudando a mejorar las herramientas de bigData con las que se lucha contra la enfermedad.</li>
        </ol>
      </>
    )
  }
}

export default translations
