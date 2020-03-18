import React from 'react'

const translations = {
  additionalInformationUrl: '/additional-information',
  updateSymptomsUrl: '/update-symptoms',
  HelpNotImproved () {
    return (
      <>
        <h3 className="subtitle">Your basic diagnosis</h3>
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
