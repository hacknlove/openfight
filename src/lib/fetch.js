import fetchHelper from '@hacknlove/fetchhelper'

async function handleErrors (response) {
  const [ok, error] = await response
  console.error([ok, error])
  if (ok) {
    return ok
  }
  if (error.ok === false) {
    return error.json().catch(err => ({ err }))
  }
  return { me: null, error }
}

export function authenticatedFetch (url, options) {
  return handleErrors(fetchHelper('/api/' + url, {
    ...options,
    credentials: 'include'
  }))
}
export function unAuthenticatedFetch (url, options) {
  return handleErrors(fetchHelper('/api/' + url, options))
}
