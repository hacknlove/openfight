import React from 'react'
import UpdateSymptoms from '../components/UpdateSymptoms'
import getUpdateSymptoms from '../sharedGetInitialProps/getUpdateSymptoms'
import translationsCommon from '../../translations/common/english.js'
import translationsView from '../../translations/updateSymptoms/english.js'

export default function UpdateSymptomsPage ({ data }) {
  return <UpdateSymptoms data={data} translations={{ ...translationsCommon, ...translationsView }} currentView="updateSymptoms"/>
}

UpdateSymptomsPage.getInitialProps = getUpdateSymptoms
