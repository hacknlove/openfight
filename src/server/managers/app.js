import mongo from './mongo'
import passport from './passport'
import steprunner from '../lib/steprunner'

function addResponseHelper (state, req, res) {
  state.control.response = function (response, status = 200) {
    res.status(status).json({
      data: response,
      me: req.user
    })
    state.control.done()
  }
}

export default function app (...array) {
  return steprunner([
    addResponseHelper,
    mongo,
    passport,
    ...array
  ], {
    verbose: true,
    errorHandling (name, error, state, req, res) {
      console.log(name, error, req.path)
      res.status(500).json({ step: name })
    }
  })
}

export function switchMethod (dict) {
  return function (req, res) {
    if (dict[req.method]) {
      return dict[req.method](req, res)
    }
    res.status(404).json({ error: 'not found' })
  }
}
