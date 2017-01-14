console.log("connected")

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's

const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600))

console.table(fifteen)

// Array.prototype.map()
// 2. Give us an array of the inventor first and last names

const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}` )

console.log(fullNames)

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest

const ordered = inventors.sort((a,b) => a.year > b.year ? 1 : -1)
console.table(ordered)

// Array.prototype.reduce()
// 4. How many years did all the inventors live?

const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year)
}, 0)

console.log(totalYears)

// 5. Sort the inventors by years lived

const oldest = inventors.sort(function (a, b) {
  const lastInventor = a.passed - a.years
  const nextInventor = b.passed - b.years
  return lastInventor > nextInventor ? -1 : 1
})

console.table(oldest)

// 6. Sort exercise
// Sort the people alphabetically by last name

const alpha = people.sort((lastOne, nextOne) => {
  const [aLast, aFirst] = lastOne.split(', ')
  const [bLast, bFirst] = nextOne.split(', ')
  return aLast > bLast ? 1 : -1
})

console.log(alpha)


/////////////////////////
// Text Scramble
////////////////////////
class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const phrases = [
  'Neo,',
  'checkout',
  'the console',
  'to see',
  'what is going on',
  'this',
  'page...'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}

next()
