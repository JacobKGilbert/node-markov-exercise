const { MarkovMachine } = require('./markov')

let mm

beforeEach(function () {
  let str = 'the cat in the hat'
  mm = new MarkovMachine(str)
})

test('MarkovMachine.makeChains should make wordsObj', function () {
  expect(mm.wordsObj).toEqual({
    the: ['cat', 'hat'],
    cat: ['in'],
    in: ['the'],
    hat: [null],
  })
})

test('MarkovMachine.makeText should return a string', function () {
  expect(mm.makeText()).toEqual(expect.any(String))
})