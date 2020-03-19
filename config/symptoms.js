const selectCommonIntensityOptions = [
  'NotAnswer',
  'No',
  'Little',
  'Some',
  'Quite',
  'ALot'
]

const selectCommonFrequencyOptions = [
  'NotAnswer',
  'Never',
  'AFewTimes',
  'SomeTimes',
  'ManyTimes',
  'Always'
]

const symptoms = [
  {
    name: 'fever',
    type: 'select',
    options: selectCommonIntensityOptions
  },
  {
    name: 'cough',
    type: 'select',
    options: selectCommonFrequencyOptions
  },
  {
    name: 'mucus',
    type: 'select',
    options: selectCommonIntensityOptions
  },
  {
    name: 'NasalCongestion',
    type: 'select',
    options: selectCommonIntensityOptions
  },
  {
    name: 'sneeze',
    type: 'select',
    options: selectCommonFrequencyOptions
  },
  {
    name: 'soreThroat',
    type: 'select',
    options: selectCommonIntensityOptions
  },
  {
    name: 'respiratoryDistress',
    type: 'select',
    options: selectCommonIntensityOptions
  },
  {
    name: 'sputum',
    type: 'select',
    options: selectCommonIntensityOptions
  },
  {
    name: 'vomit',
    type: 'select',
    options: selectCommonIntensityOptions
  },
  {
    name: 'diarrhea',
    type: 'select',
    options: selectCommonIntensityOptions
  },
  {
    name: 'fatigue',
    type: 'select',
    options: selectCommonIntensityOptions
  },
  {
    name: 'lackOfAppetite',
    type: 'select',
    options: selectCommonIntensityOptions
  }
]

export default symptoms
