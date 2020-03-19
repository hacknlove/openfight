import React from 'react'

const translations = {
  followUpTitle: 'Your basic diagnosis:',
  additionalInformationUrl: '/additional-information',
  updateSymptomsUrl: '/update-symptoms',
  levels: {
    VeryLow: 'Very Low',
    Low: 'Low',
    Moderate: 'Moderate',
    High: 'High'
  },
  extended: {
    VeryLow: 'Very Low',
    Low: 'Low',
    Moderate: 'Moderate',
    High () {
      return (
        <>
          <h3 className="subtitle">It is very likely that you have COVID-19</h3>
          <ol className="helpSteps">
            <li><strong>You should immediately call the health authorities and follow their instructions.</strong></li>
            <li>Do not leave home and avoid contact with other people.</li>
          </ol>
        </>
      )
    }
  },
  SymptomsTitle: 'The symptoms you entered',
  HelpNotImproved () {
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
  },
  additionalInformation: 'Additional Information',
  updateSymptoms: 'Update Symptoms'
}

export default translations
