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
        <h3 className="subtitle">Important information about the diagnosis</h3>
        <ol className="helpSteps">
          <li>This diagnosis is only based on the symptoms you have indicated.</li>
          <li><strong>You can improve the diagnosis by providing additional information such as age or gender.</strong></li>
          <li>Another way to improve diagnosis is anonymous monitoring. Update your symptoms periodically for a more accurate diagnosis.</li>
          <li>In addition, you will be helping to improve the statistical and deep learning models with which the pandemic is fought.</li>
        </ol>
      </>
    )
  }
}

export default translations
