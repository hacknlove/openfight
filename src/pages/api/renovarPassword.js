import app, { switchMethod } from '../../server/managers/app'
import randomStrings from '../../server/lib/randomString'
import hashStrings from '../../server/lib/hashStrings'
import { authenticate } from '../../server/managers/passport'
import validateUser from '../../server/lib/validateUser'

function hashPassword ({
  set
}) {
  set.plainPassword = randomStrings(8)
  set.password = hashStrings(set.plainPassword)
}

async function updateUser ({
  mongo,
  get: {
    plainPassword,
    password
  }
}, {
  user: {
    _id
  }
}) {
  await mongo.collection('users').updateOne({
    _id
  }, {
    $set: {
      plainPassword,
      password
    }
  })
}

function closeSessions ({
  mongo
}, {
  user: {
    userCode,
    randomString
  }
}) {
  mongo.collection('tokens').removeMany({ userCode, randomString: { $ne: randomString } })
}

function response ({
  control: {
    response,
    done
  },
  get: {
    plainPassword
  }
}) {
  response({
    ok: true,
    password: plainPassword
  })
  done()
}

export default switchMethod({
  POST: app(
    authenticate('jwt', { session: false }),
    validateUser,
    hashPassword,
    updateUser,
    closeSessions,
    response
  )
})
