import fetch from 'isomorphic-unfetch'
import { parseCookies } from 'nookies'
import absoluteUrl from 'next-absolute-url'

export default async function isometricFetch (ctx, url, options = {}) {
  const { origin } = absoluteUrl(ctx.req)
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

  const response = await fetch(`${origin}/api/${url}`, options).catch(err => ({ err }))
  if (!response || response.err || !response.ok) {
    return {}
  }

  const json = await response.json().catch(err => ({ err }))
  return json
}
