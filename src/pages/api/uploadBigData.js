var AWS = require('aws-sdk')

const s3 = new AWS.S3({
  secretAccessKey: process.env.secretAccessKey,
  accessKeyId: process.env.accessKeyId,
  region: process.env.region,
  endpoint: process.env.endpoint,
  sslEnabled: true,
  httpOptions: {
    timeout: 6000,
    agent: false
  }
})
