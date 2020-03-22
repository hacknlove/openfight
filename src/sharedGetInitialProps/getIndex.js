import redirect from 'next-redirect'
import languages from '../../config/languages'
import isometricFetch from '../lib/isometricFetch'
import Negotiator from 'negotiator'

const availableLanguages = Object.values(languages).map(l => l.languageCode)

export default async function getIndex (ctx) {
  if (typeof window === 'undefined' && ctx.req.url === '/') {
    const negotiator = new Negotiator(ctx.req)
    const language = negotiator.language(availableLanguages)
    if (language !== 'en') {
      for (const lang of Object.values(languages)) {
        if (lang.languageCode === language) {
          redirect(ctx, lang.index)
          return {}
        }
      }
    }
  }
  const data = await isometricFetch(ctx, 'last')

  if (data.me && data.me.userCode) {
    for (const language of Object.values(languages)) {
      if (ctx.req.url === language.index) {
        redirect(ctx, language.followUp)
        break
      }
    }
    return {}
  }
  return { data }
}
