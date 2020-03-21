import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import '../styles/styles.sass'
import Alerts from '../components/Alerts'

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>openFight</title>
        </Head>
        <Alerts />
        <Component {...pageProps} />
      </>
    )
  }
}
