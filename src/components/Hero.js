import React from 'react'
import LanguagePicker from './LanguagePicker'

export default function Hero ({ translations, currentView = '/' }) {
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <p id="openSourceDataInnovation">
            <a className="has-text-black" href="https://github.com/hacknlove/stopCovid19" target="_blank" rel="noopener noreferrer"><i className="icon fab fa-github"></i> OpenSource</a><br />
            <a className="has-text-black" href="https://stopcovid19.s3.eu-west-3.amazonaws.com/csv/data.csv" target="_blank" rel="noopener noreferrer"><i className="icon fab fa-creative-commons-share"></i> OpenData</a>
          </p>
          <br />
          <LanguagePicker translations={translations} currentView={currentView}/>
          <h1 className="title">
            {translations.title}
          </h1>
          <h2 className="subtitle">
            {translations.subtitle}
          </h2>
        </div>
      </div>
    </section>
  )
}
