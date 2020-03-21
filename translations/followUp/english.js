import React from 'react'

const translations = {
  title: 'openFight - diagnosis',
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
    VeryLow () {
      return (
        <>
          <h3 className="subtitle">It seems that you do not have COVID-19</h3>
          <ol className="helpSteps">
            <li><strong>You could be incubating it, so come back if your symptoms change.</strong></li>
            <li>Do not leave your home unless you really need it, because you could get infected.</li>
            <li>Please wait until the authorities say the risk of going out was low.</li>
          </ol>
        </>
      )
    },
    Low () {
      return (
        <>
          <h3 className="subtitle">You could have a low COVID-19</h3>
          <ol className="helpSteps">
            <li><strong>It seems you have not COVID-19, but you could have it and being almost not affected.</strong></li>
            <li>Please, stay at home to minimize the risk or be infected or infect others.</li>
          </ol>
        </>
      )
    },
    Moderate () {
      return (
        <>
          <h3 className="subtitle">You could have COVID-19</h3>
          <ol className="helpSteps">
            <li><strong>Please. call the health authorities to get further instructions.</strong></li>
            <li>In the meanwhile, keep yourself at home, and avoid the contact with any other people.</li>
          </ol>
        </>
      )
    },
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
