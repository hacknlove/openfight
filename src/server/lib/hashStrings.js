const seedrandom = require('seedrandom')

function hashStrings (string, length = 32) {
  const rnd = seedrandom(process.env.HASH_SECRET + string)
  const buffer = new ArrayBuffer(32)
  const view = new Uint8Array(buffer)
  for (let i = length; --i;) {
    view[i] = rnd.int32() % 256
  }
  return Buffer.from(String.fromCharCode.apply(null, view)).toString('base64')
}

module.exports = hashStrings
