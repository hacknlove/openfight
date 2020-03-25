import React from 'react'
import Index from '../components/Index'
import translationsCommon from '../../translations/common/spanish.js'
import translationsView from '../../translations/index/spanish.js'
import getIndex from '../sharedGetInitialProps/getIndex'

export default function Home () {
  return <Index translations={{ ...translationsCommon, ...translationsView }} currentView="index"/>
}

Home.getInitialProps = getIndex
