module.exports = function response ({ context: { done } }) {
  done(200, { ok: true })
}
