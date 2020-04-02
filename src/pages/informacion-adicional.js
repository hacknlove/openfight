import React from 'react'
import AdditionalInformation from '../components/AdditionalInformation'
import getAdditionalInformation from '../sharedGetInitialProps/getAdditionalInformation'
import translationsCommon from '../../translations/common/spanish.js'
import translationsView from '../../translations/additionalInformation/spanish.js'

export default function AdditionalInformationPage ({ data }) {
  return <AdditionalInformation data={data} translations={{ ...translationsCommon, ...translationsView }} currentView="additionalInformation"/>
}

AdditionalInformationPage.getInitialProps = getAdditionalInformation
