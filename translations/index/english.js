import React from 'react'

const translations = {
  title: 'OpenFight - start',
  followUpUrl: '/followUp',
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
  }
}

export default translations
