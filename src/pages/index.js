import React from 'react'
import Index from '../components/Index'
import translationsCommon from '../../translations/common/english.js'
import translationsView from '../../translations/index/english.js'

export default function Home () {
  return <Index translations={{ ...translationsCommon, ...translationsView }} currentView="index"/>
}
