import React from 'react'
import FollowUp from '../components/FollowUp'
import getFollowUp from '../sharedGetInitialProps/getFollowUp'
import translationsCommon from '../../translations/common/spanish.js'
import translationsView from '../../translations/followUp/spanish.js'

export default function FollowUpPage ({ data }) {
  return <FollowUp data={data} translations={{ ...translationsCommon, ...translationsView }} currentView="followUp"/>
}

FollowUpPage.getInitialProps = getFollowUp
