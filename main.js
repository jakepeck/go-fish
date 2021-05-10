// console.log('madeit to the main page i see')
const newGameBtn = document.querySelector('#newGame')
const gameDeck = []
const ranks = [
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Jack',
  'Queen',
  'King',
  'Ace'
]
const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']

class Card {
  constructor(rank, suit, value) {
    this.rank = rank
    this.suit = suit
    this.value = value
  }
}

class Player {
  constructor() {
    this.hand = []
    this.books = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
  addCardToHand(card) {
    this.hand.push(card)
  }
  printHand() {
    console.log('players current hand is: ')
    for (let i = 0; i < this.hand.length; i++) {
      console.log(typeof this.hand[i].value)
      console.log(
        this.hand[i].rank +
          ' of ' +
          this.hand[i].suit +
          ' value is ' +
          this.hand[i].value
      )
    }
  }
  updateBooks() {
    console.log('Calling updateBooks')
    console.log(`Current books array is : ${this.books}`)
    this.books.forEach((book) => {
      book = 0
    })
    console.log('Reset books array')
    console.log(`Reset books array is now ${this.books}`)
    this.hand.forEach((card) => {
      console.log(
        `Card is: ${card.rank} of ${card.suit} value is ${card.value}`
      )
      this.books[card.value] += 1
      console.log(`Books is now: ${this.books}`)
    })
    console.log(`Books at end of function udpateBooks is: ${this.books}`)
  }
  fishRandomly() {
    let randomFish = this.hand[Math.floor(Math.random() * this.hand.length)]
    console.log(randomFish.rank)
    console.log(randomFish.suit)
    console.log(randomFish.value)
  }
  isInHand(cardVal) {
    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i].value === cardVal) {
        return true
      }
    }
    return false
  }
}

class ComputerPlayer extends Player {
  constructor() {
    super()
    this.memory = []
  }
}

const initDeck = (deck) => {
  if (deck.length != 0) {
    deck = []
  }

  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      let card = new Card(ranks[i], suits[j], i)
      deck.push(card)
    }
  }
  return deck
}

const printDeck = (deck) => {
  for (let i = 0; i < deck.length; i++) {
    console.log(deck[i])
  }
}

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}

const drawTopCard = (deck) => {
  console.log(
    `top of deck is ${deck[0].rank} of ${deck[0].suit}, bottom of deck is:  ${
      deck[deck.length - 1].rank
    } of ${deck[deck.length - 1].suit}`
  )
  let cardDrawn = deck.shift()
  console.log(cardDrawn)
  console.log(
    `new top of deck is: ${deck[0].rank} of ${deck[0].suit}, last card : ${
      deck[deck.length - 1].rank
    } of ${deck[deck.length - 1].suit}`
  )
  return cardDrawn
}

const dealCards = () => {
  console.log('deal cards clicked')
  initDeck(gameDeck)
  console.log('initialized deck is: ')
  printDeck(gameDeck)
  console.log('Shuffled deck is: ')
  shuffleDeck(gameDeck)
  printDeck(gameDeck)

  if (allPlayers.length === 2) {
    console.log('Dealing has begun')
    for (let i = 0; i < allPlayers.length; i++) {
      // 2 players so 7 cards dealt to each
      for (let j = 0; j < 7; j++) {
        console.log(gameDeck.length)
        let cardDrawn = drawTopCard(gameDeck)
        console.log(
          `player ${i} has drawn card: ${cardDrawn.rank} of ${cardDrawn.suit}`
        )
        allPlayers[i].addCardToHand(cardDrawn)
        allPlayers[i].printHand()
        console.log(`deck is now ${gameDeck.length} cards`)
      }
      console.log('Calling updateBooks for each player')
      allPlayers[i].updateBooks()
    }
    console.log('Dealing is complete')

    player.fishRandomly()
  }
}

let player = new Player()
let player2 = new Player()
player2.addCardToHand(new Card('Five', 'Spades', 3))
player2.printHand()
console.log(player2.isInHand(3))
console.log(player2.isInHand(5))

let numCPU = 1
let cpu1 = new ComputerPlayer()
console.log(player, cpu1)

let allPlayers = [player, cpu1]

newGameBtn.addEventListener('click', dealCards)

// initDeck(gameDeck)
// printDeck(gameDeck)
