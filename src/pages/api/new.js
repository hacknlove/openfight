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

  symptoms.forEach(symptom => {
    switch (symptom.type) {
      case 'select': {
        schema[symptom.name] = joi.string().valid(...symptom.options)
        break
      }
      case 'steps': {
        schema[symptom.name] = joi.number().min(symptom.min).max(symptom.max)
        break
      }
    }
  })

  return joi.object(schema)
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
  set.history = mongo.collection('history').insertOne({
    symptoms,
    userId,
    diagnosis,
    date: new Date()
  })
}

async function waitInserts ({
  get: {
    history,
    insertToken
  }
}) {
  await history
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
