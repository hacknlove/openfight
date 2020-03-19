import React from 'react'
import FollowUp from '../components/FollowUp'
import getFollowUp from '../sharedGetInitialProps/getFollowUp'
import translationsCommon from '../../translations/common/english.js'
import translationsView from '../../translations/followUp/english.js'

export default function FollowUpPage ({ data }) {
  return <FollowUp data={data} translations={{ ...translationsCommon, ...translationsView }} currentView="followUp"/>
}

FollowUpPage.getInitialProps = getFollowUp
