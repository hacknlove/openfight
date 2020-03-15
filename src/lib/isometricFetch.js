import fetch from 'isomorphic-unfetch'
import { parseCookies } from 'nookies'

export default async function isometricFetch (ctx, url, options = {}) {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    const cookies = parseCookies(ctx)
    if (!cookies.jwt) {
      return {}
    }
    options.headers = { Authorization: `Bearer ${cookies.jwt}` }
  } else {
    options.credentials = 'include'
  }

  const response = await fetch(`${process.env.URL}api/${url}`, options).catch(err => ({ err }))
  if (!response || response.err || !response.ok) {
    return {}
  }

  const json = await response.json().catch(err => ({ err }))
  return json
}
