import app, { switchMethod } from '../../server/managers/app'
import joi from '@hapi/joi'
import validateBodyFactory from '../../server/lib/validateBodyFactory'
import symptoms from '../../../config/symptoms'
import diagnosis from '../../../config/diagnosis'
import { authenticate } from '../../server/managers/passport'

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

  return joi.object(schema).min(1)
}

const schema = prepareSchema(symptoms)

async function getHistory ({ set, mongo }, { user: { _id: userId } }) {
  set.history = await mongo.collection('history').find({
    userId
  }, {
    projection: {
      symptom: 1
    }
  })
    .limit(100)
    .toArray()
    .catch(err => console.log(err) || [])
}

async function getDiagnostic ({
  get: {
    body: symptom,
    history
  },
  set
}, {
  user: {
    additionalData
  }
}) {
  set.diagnosis = await diagnosis(symptoms, history, additionalData)
}

async function insertHistory ({
  get: {
    symptoms,
    diagnosis
  },
  mongo,
  set
}, {
  user: {
    _id: userId
  }
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
    historyInsert
  }
}) {
  await historyInsert
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
    authenticate('jwt', { session: false }),
    getHistory,
    getDiagnostic,
    insertHistory,
    waitInserts,
    response
  )
})
