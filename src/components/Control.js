import React from 'react'

function ControlSteps ({ control, getValue, setInput, translations }) {
  return (
    <div className="control">
      <label> {translations[control.name]}: {translations.steps[+getValue(control.name) + 1]}</label>
      <div className="slider">
        <input
          className="slider is-fullwidth"
          step="1"
          min="-1"
          max="4"
          type="range"
          onChange={setInput}
          name={control.name}
          value={getValue(control.name)}
        />
      </div>
    </div>
  )
}

function ControlSelect ({ control, getValue, setInput, translations }) {
  return (
    <>
      <label> {translations[control.name]}:</label>
      <div className="control">

        <div className="select">
          <select
            name={control.name}
            onChange={setInput}
            value={getValue(control.name)}
          >
            {
              control.options.map(option => (
                <option key={option} value={option}>{translations.options[option]}</option>
              ))
            }
          </select>
        </div>
      </div>
    </>
  )
}

function ControlNumber ({ control, getValue, setInput, translations }) {
  return (
    <>
      <label> {translations[control.name]}:</label>
      <div className="control">
        <input className="input"
          type="number"
          min={control.min}
          max={control.max}
          name={control.name}
          onChange={setInput}
          value={getValue(control.name)}
        />
      </div>
    </>
  )
}

function ControlText ({ control, getValue, setInput, translations }) {
  return (
    <>
      <label> {translations[control.name]}:</label>
      <div className="control">
        <input className="input"
          type="text"
          min={control.min}
          max={control.max}
          name={control.name}
          onChange={setInput}
          value={getValue(control.name)}
        />
      </div>
    </>
  )
}

function ControlMulti ({ control, getValue, setInput, translations }) {
  console.log((getValue(control.name)))
  let value = [...(getValue(control.name) || [])]

  return (
    <>
      <label> {translations[control.name]}:</label>
      <div className="control">
        {
          control.options.map(option => (
            <div key={option} className="field">
              <input
                id={`checkbox-${option}`}
                className="is-checkradio"
                type="checkbox"
                name="exampleCheckbox"
                checked={value.includes(option)}
                onChange={event => {
                  if (event.target.checked) {
                    value.push(option)
                  } else {
                    value = value.filter(o => o !== option)
                  }
                  setInput({ target: { name: control.name, value } })
                }}
              />
              <label htmlFor={`checkbox-${option}`}>
                {translations.options[option]}
              </label>
            </div>
          ))
        }
      </div>
    </>
  )
}

function ControlUnknown ({ control, translations }) {
  return (<p>{translations[control.name]}</p>)
}

const Controls = {
  steps: ControlSteps,
  select: ControlSelect,
  number: ControlNumber,
  text: ControlText,
  multi: ControlMulti,
  unknown: ControlUnknown
}

export default function Control ({ control, getValue, setInput, translations }) {
  const CurrentControl = Controls[control.type] || Controls.unknown

  return <CurrentControl translations={translations} control={control} getValue={getValue} setInput={setInput} />
}
