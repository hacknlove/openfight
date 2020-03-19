const chars = ['!', '(', ')', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '<', '=', '>', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '.', '_', '%', '$']

function randomStrings (length = 32) {
  const arr = []
  for (let i = length; i--;) {
    arr.push(chars[Math.floor(Math.random() * chars.length)])
  }
  return arr.join('')
}

module.exports = randomStrings
