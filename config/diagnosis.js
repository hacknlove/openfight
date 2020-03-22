// You can return a promise. Usefull if you are calling an external API to get the diagnosis

// the current implementation is here only for testing proposes

// The real thing should be a call to an external ednpoing that uses deep learing or alike.

// Until the real thing is done, a person who knows what he does should tweak the values and weights

const values = {
  No: 0,
  Little: 0.25,
  Some: 0.5,
  Quite: 0.75,
  ALot: 1,
  Never: 0,
  AFewTimes: 0.25,
  SomeTimes: 0.5,
  ManyTimes: 0.75,
  Always: 1
}

const weights = {
  fever: 2,
  cough: 1,
  mucus: -3,
  NasalCongestion: -3,
  sneeze: -6,
  soreThroat: -3,
  respiratoryDistress: 3,
  sputum: 3,
  vomit: -3,
  diarrhea: -3,
  fatigue: 3,
  lackOfAppetite: -3
}

const labels = {
  VeryLow: 0.25,
  Low: 0.5,
  Moderate: 0.75,
  High: 1
}

export default function diagnosis (currentSymptoms, additionalInformation, history) {
  let maximum = 0
  let mean = 0

  for (const [symptom, value] of Object.entries(currentSymptoms)) {
    if (value === 'NotAnswer') {
      continue
    }

    if (weights[symptom] > 0) {
      maximum += weights[symptom]
    }

    mean += values[value] * weights[symptom]
  }

  const value = Math.max(0, mean / maximum)

  return {
    value,
    label: Object.entries(labels).find(([label, threshold]) => value <= threshold)[0]
  }
}
