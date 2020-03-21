import redirect from 'next-redirect'
import { parseCookies } from 'nookies'
import languages from '../../config/languages'

export default async function getIndex (ctx) {
  const cookies = parseCookies(ctx)

  if (cookies.jwt) {
    for (const language of Object.values(languages)) {
      if (ctx.req.url === language.index) {
        redirect(ctx, language.followUp)
        break
      }
    }
  }
  return {}
}
