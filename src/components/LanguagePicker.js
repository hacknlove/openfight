import React, { useState } from 'react'
import clsx from 'clsx'
import languages from '../config/languages'
import Link from 'next/link'

export default function LanguagePicker ({ translations, currentView }) {
  const [isActive, setIsActive] = useState(false)

  return (
    <div id="LanguagePicker" className={clsx('dropdown', { 'is-active': isActive })}>
      <div className="dropdown-trigger">
        <button className="button is-black" onClick={() => setIsActive(!isActive)} aria-haspopup="true" aria-controls="dropdown-menu">
          <span>{translations.Languages}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {
            Object.entries(languages).map(([label, url]) => (
              <Link key={label} href={url[currentView]}>
                <a className="dropdown-item">
                  {label}
                </a>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}
