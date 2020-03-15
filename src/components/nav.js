import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import HasRole from './HasRole'

const anonymous = new Set(['anonymous'])
const user = new Set(['user'])

const links = [
  {
    allowedRoles: anonymous,
    href: '/entrar',
    label: 'Entrar'
  },
  {
    allowedRoles: user,
    href: '/salir',
    label: 'Salir'
  }
]

export default function Nav ({ roles }) {
  return (
    <nav className={clsx('navbar', { 'is-warning': process.env.NODE_ENV === 'development' })} role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {
            links.map(link => (
              <HasRole key={link.label} userRoles={roles} allowedRoles={link.allowedRoles}>
                {
                  link.href
                    ? (
                      <Link href={link.href}>
                        <a className="navbar-item">
                          {link.label}
                        </a>
                      </Link>
                    )
                    : (
                      <a onClick={link.onClick} className="navbar-item">
                        {link.label}
                      </a>
                    )
                }
              </HasRole>
            ))
          }
        </div>
      </div>
    </nav>
  )
}
