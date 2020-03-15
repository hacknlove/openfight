require('dotenv').config()

module.exports = {
  env: {
    URL: process.env.URL,
    MAILGUN_PUBLIC: process.env.MAILGUN_PUBLIC
  }
}
