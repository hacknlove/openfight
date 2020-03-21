import isometricFetch from '../lib/isometricFetch'
import redirect from 'next-redirect'

export default async function getFollowUp (ctx) {
  const data = await isometricFetch(ctx, 'last')

  if (!data.me || !data.me.userCode) {
    redirect(ctx, '/')
  }

  return { data }
}
