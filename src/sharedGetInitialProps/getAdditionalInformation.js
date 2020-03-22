import redirect from 'next-redirect'
import isometricFetch from '../lib/isometricFetch'
import languages from '../../config/languages'

export default async function getFollowUp (ctx) {
  const data = await isometricFetch(ctx, 'last')

  if (!data.me || !data.me.userCode) {
    for (const language of Object.values(languages)) {
      if (ctx.req.url === language.additionalInformation) {
        redirect(ctx, language.index)
        break
      }
    }
    return {}
  }
  return { data }
}
