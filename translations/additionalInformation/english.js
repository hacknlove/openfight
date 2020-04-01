import React from 'react'

const translations = {
  title: 'openFight - additional information',
  followUpTitle: 'Your additional information:',
  additionalInformation: {
    zip: 'ZIP code',
    year: 'Year of birth',
    gender: 'Biological gender',
    medicalConditions: 'Medial conditions',
    bloodType: 'Blood type',
    options: {
      'A+': 'A+',
      'A-': 'A-',
      'AB+': 'AB+',
      'AB-': 'AB-',
      'B+': 'B+',
      'B-': 'B-',
      'O+': 'O+',
      'O-': 'O-',
      asthma: 'asthma',
      diabetics: 'diabetics',
      hypertension: 'hypertension',
      immunodeficiency: 'immunodeficiency',
      'heart disease': 'heart disease',
      'renal problems': 'renal problems',
      'liver problems': 'liver problems',
      apnea: 'apnea',
      masculine: 'Masculine',
      femenine: 'Femenine'
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
