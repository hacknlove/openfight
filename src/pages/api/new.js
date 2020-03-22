import app, { switchMethod } from '../../server/managers/app'
import randomStrings from '../../server/lib/randomString'
import jwt from 'jsonwebtoken'
import joi from '@hapi/joi'
import validateBodyFactory from '../../server/lib/validateBodyFactory'
import { setCookie } from 'nookies'
import symptoms from '../../../config/symptoms'
import diagnosis from '../../../config/diagnosis'

function prepareSchema (symptoms) {
  const schema = {
  }

  symptoms.forEach(control => {
    switch (control.type) {
      case 'select': {
        schema[control.name] = joi.string().valid(...control.options)
        break
      }
      case 'steps':
      case 'number': {
        schema[control.name] = joi.number().min(control.min).max(control.max)
        break
      }
      case 'text': {
        schema[control.name] = joi.string()
        break
      }
      case 'multi': {
        schema[control.name] = joi.array().items(joi.string().valid(...control.options))
      }
    }
  })

  return joi.object(schema).min(1)
}

const schema = prepareSchema(symptoms)

function createUserId ({
  set
}) {
  set.userCode = `${randomStrings(3)}-${randomStrings(3)}-${randomStrings(3)}`
}

async function insertUser ({
  set,
  get: {
    userCode,
    password
  },
  mongo
}) {
  set.insertion = mongo.collection('users').insertOne({
    userCode,
    password
  })
}

function createToken ({
  set,
  get: {
    userCode
  }
}) {
  set.randomString = randomStrings()
  set.token = jwt.sign({ sub: userCode, token: set.randomString }, process.env.JWT_SECRET)
}

async function insertToken ({
  get: {
    userCode,
    randomString
  },
  mongo,
  set
}) {
  set.insertToken = mongo.collection('tokens').insertOne({
    date: new Date(),
    userCode,
    randomString
  })
}

async function getId ({
  set,
  get: { insertion },
  control: { response }
}) {
  const operation = await insertion

  if (operation.insertedId) {
    set.userId = operation.insertedId
    return
  }

  if (operation.errmsg.startsWith('E11000 duplicate key error')) {
    switch (Object.keys(operation.keyValue)[0]) {
      case 'username':
        return response('usedUsername', 400)
      case 'email':
        return response('usedEmail', 400)
    }
  }
  return response('unknown', 400)
}

async function getDiagnostic ({
  get: {
    body: symptoms
  },
  set
}) {
  set.diagnosis = await diagnosis(symptoms)
}

async function insertHistory ({
  get: {
    userId,
    body: symptoms,
    diagnosis
  },
  mongo,
  set
}) {
  set.history = {
    symptoms,
    userId,
    diagnosis,
    date: new Date()
  }
  set.historyInsert = mongo.collection('history').insertOne(set.history)

}

async function waitInserts ({
  get: {
    historyInsert,
    insertToken
  }
}) {
  await historyInsert
  await insertToken
}

function setCookieToken ({
  get: {
    token
  }
}, _, res) {
  setCookie({ res }, 'jwt', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  })
}

function response ({
  get: {
    userCode,
    history
  },
  control: { response }
}, req) {
  req.user = { userCode }
  response({ history })
}

export default switchMethod({
  POST: app(
    validateBodyFactory(schema),
    createUserId,
    insertUser,
    getId,
    createToken,
    insertToken,
    getDiagnostic,
    insertHistory,
    waitInserts,
    setCookieToken,
    response
  )
})
