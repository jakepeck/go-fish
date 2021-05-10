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
  constructor(name) {
    this.name = name
    this.hand = []
    this.books = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
  addCardToHand(card) {
    this.hand.push(card)
  }
  printHand() {
    console.log(`player ${this.name} current hand is: `)
    for (let i = 0; i < this.hand.length; i++) {
      // console.log(typeof this.hand[i].value)
      console.log(
        this.hand[i].rank +
          ' of ' +
          this.hand[i].suit +
          ' value is ' +
          this.hand[i].value
      )
    }
  }
  printBooks() {
    console.log(`player ${this.name} current books are: `)
    console.log(this.books)
  }
  updateBooks() {
    console.log('Calling updateBooks')
    console.log(`${this.name} books array is : ${this.books}`)
    this.books.forEach((book) => {
      book = 0
    })
    console.log(`Reset books array for ${this.name}`)
    console.log(`Reset books array is now ${this.books}`)
    this.hand.forEach((card) => {
      console.log(
        `Card is: ${card.rank} of ${card.suit} value is ${card.value}`
      )
      this.books[card.value] += 1
      console.log(`Books is now: ${this.books}`)
    })
    console.log(
      `Books at end of function udpateBooks for ${this.name} is: ${this.books}`
    )
  }
  removeCardsFromHand(cardVal, numCards) {
    // function to remove 4 cards in case of book, or all cards of card value
    // if fished  by an opponent
    console.log(`calling removeCardsFromHand`)
    this.sortHandByValue()
    console.log(
      `card value to remove: ${cardVal} number to remove: ${numCards}`
    )
    console.log(this.hand)
    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i].value === cardVal) {
        this.hand.splice(i, numCards)
        console.log('Just spliced')
        console.log(this.hand)
      }
    }
  }

  pickRandomOpponent(playerArr) {
    let randOpp = parseInt(Math.floor[Math.random() * playerArr.length])
    if (randOpp === 0) {
      console.log(`randOpp was 0`)
      console.log(randOpp)
      return 1
    } else {
      console.log(`randOpp was 1-3`)
      return randOpp
    }
  }

  fishRandomly() {
    let randomFish = this.hand[Math.floor(Math.random() * this.hand.length)]
    console.log(
      `Player ${this.name} chose randomly and chose ${randomFish.rank} of ${randomFish.suit}`
    )
    return randomFish
  }
  isInHand(cardVal) {
    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i].value === cardVal) {
        return true
      }
    }
    return false
  }

  sortHandByValue() {
    this.hand.sort((a, b) => a.value - b.value)
  }
}

class ComputerPlayer extends Player {
  constructor(name) {
    super(name)
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
      console.log(`Calling updateBooks for player ${i}`)
      allPlayers[i].updateBooks()
      console.log(`Calling sortHandByValue on player ${i} hands`)
      allPlayers[i].sortHandByValue()
      allPlayers[i].printHand()
    }
    console.log('Dealing is complete')
  }
}

const playTurn = (players, playerIdx, gameRunning) => {
  if (gameRunning === true) {
    let player = players[playerIdx]
    console.log(`Player ${player.name} looks at his hand: `)
    player.printHand()
    player.printBooks()

    let playerChoiceIdx = player.pickRandomOpponent
    let playerToPickFrom = allPlayers[1]
    console.log(
      `Player ${player.name} chose to pick from player ${playerToPickFrom.name}`
    )
    let fishingTarget = player.fishRandomly()
    console.log(
      `Player ${player.name} says 'do you have any ${fishingTarget.rank}s`
    )
    console.log(`Player ${playerToPickFrom.name} looks in his hand: `)
    playerToPickFrom.printHand()
    playerToPickFrom.printBooks()
    if (playerToPickFrom.isInHand(fishingTarget.value) === true) {
      console.log(
        `${playerToPickFrom.name} says 'Yep! I have ${
          playerToPickFrom.books[fishingTarget.value]
        } of em`
      )
    } else {
      console.log(`${playerToPickFrom} says 'nope! Go Fish!'`)
      let fishMyWishCand = drawTopCard(gameDeck)
      player.addCardToHand(fishMyWishCand)
      if (fishMyWishCand.value === fishingTarget.value) {
        // LOOP TO START OF TURN
        console.log(`Fished my wish!!!!`)
        player.printHand()
        player.sortHandByValue()
        player.printHand()
        player.updateBooks()
        player.printBooks()
      } else {
        // NEXT PLAYERS TURN
        console.log(`Dangit maybe next time`)
        if (gameRunning === true) {
          playTurn(players, playerIdx + 1, gameRunning)
        }
      }
    }
  } else {
    console.log('GAme is over!!')
    return
  }
}

let gameRunning = true

const playGame = () => {
  console.log('STarting game!!')
  dealCards()
  console.log(`calling play turn`)
  playTurn(allPlayers, 0, gameRunning)
}

let player1 = new Player('Jake')
// let player2 = new Player()
// player2.addCardToHand(new Card('Five', 'Spades', 3))
// player2.printHand()
// console.log(player2.isInHand(3))
// console.log(player2.isInHand(5))

let numCPU = 1
let cpu1 = new ComputerPlayer('CPU #1')
console.log(player1, cpu1)

let allPlayers = [player1, cpu1]

newGameBtn.addEventListener('click', playGame)

// initDeck(gameDeck)
// printDeck(gameDeck)
