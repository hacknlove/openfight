import React from 'react'
import translations from '../translations/english.js'
import Index from '../components/Index'

export default function Home () {
  return <Index translations={translations} currentLanguage="en" />
}
