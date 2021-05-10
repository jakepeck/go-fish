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
    this.suit = suit
    this.rank = rank
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

const dealCards = (numCPU) => {
  console.log('deal cards clicked')
  initDeck(gameDeck)
  console.log('initialized deck is: ')
  printDeck(gameDeck)
  console.log('Shuffled deck is: ')
  shuffleDeck(gameDeck)
  printDeck(gameDeck)
}

let numCPU = 1

newGameBtn.addEventListener('click', dealCards(numCPU))

// initDeck(gameDeck)
// printDeck(gameDeck)
