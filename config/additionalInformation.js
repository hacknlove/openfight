const additionalInformation = [
  {
    name: 'year',
    type: 'number',
    min: 1900,
    max: 2020
  },
  {
    name: 'gender',
    type: 'select',
    options: ['masculine', 'femenine']
  },
  {
    name: 'zip',
    type: 'text'
  },
  {
    name: 'bloodType',
    type: 'select',
    options: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']
  },
  {
    name: 'medicalConditions',
    type: 'multi',
    options: [
      'asthma',
      'diabetics',
      'hypertension',
      'immunodeficiency',
      'heart disease',
      'renal problems',
      'liver problems',
      'apnea'
    ]
  }
]

export default additionalInformation
