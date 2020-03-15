export default function response ({ control: { response, done } }) {
  response({ ok: true })
  done()
}
