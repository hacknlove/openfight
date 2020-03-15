module.exports = function stepping (steps, {
  done,
  errorHandling,
  logger,
  newSet = () => ({}),
  verbose,
  ...other
}) {
  for (const step of steps) {
    if (typeof step !== 'function') {
      throw new Error(`${step} is not a function`)
    }
  }

  return async function runner (...params) {
    let waitRes, waitRej
    let waitProm = new Promise((resolve, reject) => {
      waitRes = resolve
      waitRej = reject
    })
    const set = newSet(...params)
    const state = {
      ...other,
      set,
      get: set,
      control: {
        done () {
          state.control.isDone = true
        },
        go (to) {
          switch (typeof to) {
            case 'number':
              state.control.nextI = to
              return
            case 'string':
              state.control.nextI = steps.findIndex(step => step.name === to)
              if (state.control.nextI === -1) {
                errorHandling(steps[state.i].name, { type: 'internal', message: `Step ${to} not found` }, state)
              }
              return
            case 'function':
              state.control.nextI = steps.findIndex(step => step === to)
              if (state.control.nextI === -1) {
                errorHandling(steps[state.i].name, { type: 'internal', message: `Step ${to.name} not found` }, state)
              }
              return
            default:
              errorHandling(steps[state.i].name, { type: 'internal', message: `go requires number, string or function. Not ${typeof to}` }, state)
          }
        },
        wait (err, res) {
          if (err) {
            waitRej(err)
          } else {
            waitRes(res)
          }
          waitProm = new Promise((resolve, reject) => {
            waitRes = resolve
            waitRej = reject
          })
        },
        autoLoggin: Boolean(logger),
        logger: logger === true ? console.log : logger,
        isDone: false,
        i: 0,
        nextI: false
      }
    }

    while (true) {
      if (state.control.nextI !== false) {
        state.control.i = state.control.nextI
        state.control.nextI = false
      }
      const step = steps[state.control.i++]
      if (!step) {
        break
      }

      if (state.control.isDone) {
        break
      }

      if (verbose) {
        console.log({
          i: state.control.i,
          step: step.name,
          data: state.data
        })
      }

      try {
        state.response = await step(state, ...params)
      } catch (_error) {
        state.response = { _error }
      }

      if (state.response === state.control.wait) {
        state.response = await waitProm
      }

      if (state.response && state.response._error && errorHandling) {
        state.response = (await errorHandling(step.name, state.response._error, state, ...params)) || state.response
      }

      if (state.response === state.control.wait) {
        state.response = await waitProm
      }

      if (state.control.autoLoggin && state.control.logger) {
        state.control.logger({
          i: state.i,
          step: step.name,
          ts: Date.now(),
          get: state.get,
          response: state.response
        })
      }

      if (state.response && state.response._error) {
        return state.response
      }
    }

    return state.response
  }
}
