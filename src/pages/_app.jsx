import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import '../styles/styles.sass'

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>StopCOVID-19</title>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}
