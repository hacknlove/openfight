import React from 'react'

const translations = {
  title: 'stop-COVID-19',
  subtitle: 'anonymous tool for diagnostic and follow-up',
  HelpIndex () {
    return (
      <>
        <h3 className="subtitle">Read carefully:</h3>
        <ol className="helpSteps">
          <li>Fill out this form to find out if your symptoms correspond to those of the coronavirus.</li>
          <li><strong>This automated expert system that does not replace or replace a professional diagnosis, should only be used as a guide.</strong></li>
          <li>It is not necessary to fill in all the data, but the more information you provide, the more accurate the diagnosis will be.</li>
          <li>The diagnosis is completely anonymous.</li>
        </ol>
      </>
    )
  },
  Syntoms: 'Syntoms',
  steps: [
    'Not Answer',
    'No',
    'Little',
    'Some',
    'Quite',
    'A Lot'
  ],
  symptoms: {
    fever: 'Fever',
    cough: 'Cough',
    mucus: 'Mucus',
    NasalCongestion: 'Nasal Congestion',
    sneeze: 'Sneeze',
    soreThroat: 'Sore Throat',
    respiratoryDistress: 'Respiratory Distress',
    sputum: 'Sputum',
    vomit: 'Vomit',
    diarrhea: 'Diarrhea',
    fatigue: 'Fatigue',
    lackOfAppetite: 'Lack of Appetite'
  },
  Next: 'Next',
  LoginTitle: 'Follow Up',
  LoginSubtitle: 'Completely anonymous and secure',
  userCode: 'User code',
  password: 'Password',
  Languages: 'Languages'
}

export default translations
