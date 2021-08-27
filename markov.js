/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let wordsObj = {}
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      let nextWord

      // Check if nextWord would still be in range.
      if (i >= 0 && i < this.words.length - 1) {
        nextWord = this.words[i + 1]
      } else {
        nextWord = null
      }

      // Check if current word is alread a key in wordsObj. If not add it.
      if (word in wordsObj) {
        wordsObj[word].push(nextWord)
      } else {
        wordsObj[word] = [nextWord]
      }
    }
    this.wordsObj = wordsObj
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let randNum = Math.floor(Math.random() * this.words.length)
    let word = this.words[randNum]
    let str = ''

    for (let i = 0; i < numWords; i++) {
      str += `${word} `
      let randIdx = Math.floor(Math.random() * this.wordsObj[word].length)
      const nextWord = this.wordsObj[word][randIdx]
      if (nextWord === null) {
        // Remove the trailing space at the end of the sentence.
        str.replace(/\s+$/, '')
        break
      }
      word = nextWord
    }

    return str
  }
}

module.exports = {MarkovMachine}