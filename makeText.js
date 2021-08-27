const {MarkovMachine} = require('./markov')
const axios = require('axios')
const fs = require('fs')

let type = process.argv[2]
let path = process.argv[3]

function makeRandomizedText(text) {
  let mm = new MarkovMachine(text)
  console.log(mm.makeText())
}

function getText(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      // handle possible error
      console.error(`Error reading ${path}: ${err}`)
      // kill the process and tell the shell it errored
      process.exit(1)
    }
    // otherwise success
    makeRandomizedText(data)
  })
}

async function getURLText(url) {
  try {
    res = await axios.get(`${url}`)
    makeRandomizedText(res.data)
  } catch (err) {
    console.log(`Error reading ${url}: ${err}`)
    process.exit(1)
  }
}

if (type === 'url') {
  getURLText(path)
} else {
  getText(path)
}