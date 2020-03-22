import app, { switchMethod } from '../../server/managers/app'

import { authenticate } from '../../server/managers/passport'
import validateUser from '../../server/lib/validateUser'

export default switchMethod({
  GET: app(
    authenticate('jwt', { session: false }),
    validateUser
  )
})
