import React from 'react'
import FollowUp from '../components/FollowUp'
import getFollowUp from '../sharedGetInitialProps/getFollowUp'
import translationsCommon from '../../translations/common/english.js'
import translationsView from '../../translations/followUp/english.js'
import { enUS } from 'date-fns/locale'

export default function FollowUpPage ({ data }) {
  return <FollowUp data={data} translations={{ ...translationsCommon, ...translationsView }} dataLocale={enUS} currentView="followUp"/>
}

FollowUpPage.getInitialProps = getFollowUp
