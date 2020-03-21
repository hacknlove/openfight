import React from 'react'

const translations = {
  title: 'openFight - update symptoms',
  updateSymptomsTitle: 'Enter your current symptoms:',
  Help () {
    return (
      <>
        <h3 className="subtitle">Better diagnosis</h3>
        <ol className="helpSteps">
          <li>Update your symptoms as frequently as you want. More than once a day if you think it's necessary.</li>
          <li><strong>If you could be infected, update your symptoms at least daily.</strong></li>
          <li>If you are not infected, update your symptoms when they change.</li>
          <li>The bigger the big data we gather, the better the diagnosis we can do.</li>
        </ol>
      </>
    )
  },
  additionalInformation: 'Additional Information',
  updateSymptoms: 'Update Symptoms'
}

export default translations
