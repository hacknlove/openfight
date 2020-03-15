import app, { switchMethod } from '../../server/managers/app'
import randomStrings from '../../server/lib/randomString'
import hashStrings from '../../server/lib/hashStrings'
import jwt from 'jsonwebtoken'
import joi from '@hapi/joi'
import validateBodyFactory from '../../server/lib/validateBodyFactory'
import { setCookie } from 'nookies'
import requestIp from 'request-ip'

const schema = joi.object({
  Fiebre: joi.string(),
  Tos: joi.string(),
  Moco: joi.string(),
  CongestiónNasal: joi.string(),
  Estornudos: joi.string(),
  DolorDeGarganta: joi.string(),
  DificultadParaRespirar: joi.string(),
  Flema: joi.string(),
  Vomito: joi.string(),
  Diarrea: joi.string(),
  Cansancio: joi.string(),
  Debilidad: joi.string()
})

function hashPassword ({
  set
}) {
  set.plainPassword = randomStrings(8)
  set.password = hashStrings(set.plainPassword)
}

async function insertUser ({
  set,
  get: {
    password
  },
  mongo
}, req) {
  set.insertion = mongo.collection('users').insertOne({
    password,
    ip: [requestIp.getClientIp(req)]
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

function createToken ({
  set,
  get: {
    userId
  }
}) {
  set.randomString = randomStrings()
  set.token = jwt.sign({ sub: userId, token: set.randomString }, process.env.JWT_SECRET)
}

async function insertToken ({
  get: {
    userId,
    randomString
  },
  mongo,
  set
}) {
  set.token = mongo.collection('tokens').insertOne({
    date: new Date(),
    userId,
    randomString
  })
}

const positivos = new Set([
  'Fiebre',
  'Tos',
  'DificultadParaRespirar',
  'Flema',
  'Cansancio',
  'Debilidad'
])

const negativos = new Set([
  'Moco',
  'CongestiónNasal',
  'Estornudos',
  'DolorDeGarganta',
  'Vomito',
  'Diarrea'
])

async function insertParameters ({
  get: {
    userId,
    body
  },
  mongo,
  set
}, req) {

  let sum = 0

  for (const [key, value] of Object.entries(body)) {
    if (value === 'No sé') {
      delete body[key]
      continue
    }
    const v = +value
    body[key] = v

    if (positivos.has(key)) {
      sum += +v
    } else if (negativos.has(key)) {
      sum -= v
    } else {
      console.log('Error, por ahora no tenemos parametros neutros')
    }
    set.diagnostico = (sum + 600) / 12

  }
  set.parameters = mongo.collection('parameters').insertOne({
    ...body,
    userId,
    diagnostico: set.diagnostico,
    ip: requestIp.getClientIp(req),
    date: new Date()
  })
}

async function waitInserts ({
  get: {
    parameters,
    token
  }
}) {
  await parameters
  await token
}

function setCookieToken ({
  get: {
    token
  }
}, req, res) {
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
    userId,
    diagnostico,
    plainPassword
  },
  control: { response }
}, req) {
  req.user = { userId }
  response({ diagnostico, plainPassword })
}

export default switchMethod({
  POST: app(
    validateBodyFactory(schema),
    hashPassword,
    createToken,
    insertUser,
    getId,
    insertToken,
    insertParameters,
    waitInserts,
    setCookieToken,
    response
  )
})
