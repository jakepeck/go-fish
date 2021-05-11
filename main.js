// console.log('madeit to the main page i see')
const playerHandDisplay = document.querySelector(`#player .hand`)
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
let cardsFishedAndOrWished = 0

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
    this.numBooks = 0
  }
  addCardToHand(card) {
    this.hand.push(card)
  }
  addCardsToHand(cards) {
    for (let i = 0; i < cards.length; i++) {
      this.addCardToHand(cards[i])
    }
  }
  printHand() {
    // console.log(`player ${this.name} current hand is: `)
    // for (let i = 0; i < this.hand.length; i++) {
    //   // console.log(typeof this.hand[i].value)
    //   console.log(
    //     this.hand[i].rank +
    //       ' of ' +
    //       this.hand[i].suit +
    //       ' value is ' +
    //       this.hand[i].value
    //   )
    // }
    // console.log(this.hand)
  }
  printBooks() {
    // console.log(`player ${this.name} current books are: `)
    // console.log(this.books)
  }
  updateBooks() {
    // console.log('Calling updateBooks')
    // console.log(`${this.name} books array is : ${this.books}`)
    for (let i = 0; i < this.books.length; i++) {
      this.books[i] = 0
    }
    // console.log(`Reset books array for ${this.name}`)
    // console.log(`Reset books array is now ${this.books}`)
    this.hand.forEach((card) => {
      // console.log(
      //   `Card is: ${card.rank} of ${card.suit} value is ${card.value}`
      // )
      this.books[card.value] += 1
      // console.log(`Books is now: ${this.books}`)
    })
    // console.log(
    //   `Books at end of function updateBooks for ${this.name} is: ${this.books}`
    // )

    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i] === 4) {
        console.log(`\n\n\n-----FINALLY A BOOK FOUND!!!!----\n\n\n`)
        this.removeCardsFromHand(i, 4)
        this.numBooks++
      }
    }
  }
  removeCardsFromHand(cardVal, numCards) {
    // function to remove 4 cards in case of book, or all cards of card value
    // if fished  by an opponent
    let cardsToRemove = []
    // console.log(`calling removeCardsFromHand`)
    this.sortHandByValue()
    // console.log(
    //   `card value to remove: ${cardVal} number to remove: ${numCards}`
    // )
    // console.log(this.hand)
    for (let i = 0; i < this.hand.length; i++) {
      if (
        this.hand[i].value === cardVal &&
        numCards === this.books[this.hand[i].value]
      ) {
        cardsToRemove = this.hand.splice(i, numCards)
        // console.log('Just spliced')
        // console.log(this.hand)
      }
    }
    this.updateBooks()
    return cardsToRemove
  }

  pickRandomOpponent(playerArr, currentPlayer) {
    let randOpp = Math.floor(Math.random() * playerArr.length)
    if (randOpp === currentPlayer) {
      // console.log(`randOpp was same as player`)
      // console.log(randOpp)
      return this.pickRandomOpponent(playerArr, currentPlayer)
    } else {
      // console.log(
      //   `randOpp was opponent number: ${randOpp} and the currentPlayer was ${currentPlayer}`
      // )
      return randOpp
    }
  }

  fishRandomly() {
    let randomFish = this.hand[Math.floor(Math.random() * this.hand.length)]
    // console.log(
    //   `Player ${this.name} chose randomly and chose ${randomFish.rank} of ${randomFish.suit}`
    // )
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
  // console.log(
  //   `top of deck is ${deck[0].rank} of ${deck[0].suit}, bottom of deck is:  ${
  //     deck[deck.length - 1].rank
  //   } of ${deck[deck.length - 1].suit}`
  // )
  let cardDrawn = deck.shift()
  console.log(cardDrawn)
  // console.log(
  //   `new top of deck is: ${deck[0].rank} of ${deck[0].suit}, last card : ${
  //     deck[deck.length - 1].rank
  //   } of ${deck[deck.length - 1].suit}`
  // )
  return cardDrawn
}

const dealCards = (allPlayers) => {
  console.log('deal cards clicked')
  initDeck(gameDeck)
  // console.log('initialized deck is: ')
  // printDeck(gameDeck)
  // console.log('Shuffled deck is: ')
  shuffleDeck(gameDeck)
  // printDeck(gameDeck)

  if (allPlayers.length === 2) {
    // console.log('Dealing has begun')
    for (let i = 0; i < allPlayers.length; i++) {
      // 2 players so 7 cards dealt to each
      for (let j = 0; j < 7; j++) {
        // console.log(gameDeck.length)
        let cardDrawn = drawTopCard(gameDeck)
        // console.log(
        //   `player ${allPlayers[i].name} has drawn card: ${cardDrawn.rank} of ${cardDrawn.suit}`
        // )
        allPlayers[i].addCardToHand(cardDrawn)
        allPlayers[i].printHand()
        // console.log(`deck is now ${gameDeck.length} cards`)
      }
      // console.log(`Calling updateBooks for player ${i}`)
      allPlayers[i].updateBooks()
      // console.log(`Calling sortHandByValue on player ${i} hands`)
      allPlayers[i].sortHandByValue()
      allPlayers[i].printHand()
    }
    // console.log('Dealing is complete')
  } else {
    // console.log('Dealing has begun')
    for (let i = 0; i < allPlayers.length; i++) {
      // 3-4 players so 5 cards dealt to each
      for (let j = 0; j < 5; j++) {
        // console.log(gameDeck.length)
        let cardDrawn = drawTopCard(gameDeck)
        // console.log(
        //   `player ${allPlayers[i].name} has drawn card: ${cardDrawn.rank} of ${cardDrawn.suit}`
        // )
        allPlayers[i].addCardToHand(cardDrawn)
        allPlayers[i].printHand()
        // console.log(`deck is now ${gameDeck.length} cards`)
      }
      // console.log(`Calling updateBooks for player ${i}`)
      allPlayers[i].updateBooks()
      // console.log(`Calling sortHandByValue on player ${i} hands`)
      allPlayers[i].sortHandByValue()
      allPlayers[i].printHand()
    }
    // console.log('Dealing is complete')
  }
}

const getGameScore = (players) => {
  let sum = 0
  players.forEach((player) => {
    sum += player.numBooks
  })
  return sum
}

const getWinner = (players) => {
  let winningBooks = 0
  let winString = ''
  for (let i = 0; i < players.length; i++) {
    if (players[i].numBooks > winningBooks) {
      winningBooks = players[i].numBooks
      winString = players[i].name
    } else {
      if (players[i].numBooks === winningBooks) {
        winString += ' and ' + players[i].name
      }
    }
  }
  return winString
}

const letTheRobotsPlay = (players) => {
  for (let i = 0; i < players.length; i++) {
    if (getGameScore(players) === 13) {
      let winString = getWinner(players)
      console.log('Game over!!!!!!!')
      console.log(`ANDDDDD THE WINNER ISSS........... ${winString}`)
      return 0
    }

    let player = players[i]
    console.log(`Player ${player.name} TURN`)
    // player.printHand()
    // player.printBooks()
    if (player.hand.length === 0 && gameDeck.length === 0) {
    } else {
      if (player.hand.length === 0 && gameDeck.length > 0) {
        let needToDraw = drawTopCard(gameDeck)
        player.addCardToHand(needToDraw)
        player.updateBooks()
      }

      let playerChoiceIdx = player.pickRandomOpponent(players, i)
      // console.log(playerChoiceIdx)
      let playerToPickFrom = players[playerChoiceIdx]
      // console.log(
      //   `Player ${player.name} chose to pick from player ${playerToPickFrom.name}`
      // )
      let fishingTarget = player.fishRandomly()
      // console.log(
      //   `Player ${player.name} says 'do you have any ${fishingTarget.rank}s to ${playerToPickFrom.name}`
      // )
      // console.log(`Player ${playerToPickFrom.name} looks in his hand: `)
      // playerToPickFrom.printHand()
      // playerToPickFrom.printBooks()

      if (playerToPickFrom.isInHand(fishingTarget.value) === true) {
        // console.log(
        //   `${playerToPickFrom.name} says 'Yep! I have ${
        //     playerToPickFrom.books[fishingTarget.value]
        //   } of em`
        //)
        cardsFishedAndOrWished++
        let cardsFished = playerToPickFrom.removeCardsFromHand(
          fishingTarget.value,
          playerToPickFrom.books[fishingTarget.value]
        )
        player.addCardsToHand(cardsFished)
        player.updateBooks()
        // player.printHand()
        // player.printBooks()
        // playerToPickFrom.printHand()
        // playerToPickFrom.printBooks()
        i--
      } else {
        // console.log(`${playerToPickFrom.name} says 'nope! Go Fish!'`)
        if (gameDeck.length > 0) {
          let fishMyWishCand = drawTopCard(gameDeck)
          player.addCardToHand(fishMyWishCand)
          if (fishMyWishCand.value === fishingTarget.value) {
            // LOOP TO START OF TURN
            cardsFishedAndOrWished++
            // console.log(`Fished my wish!!!!`)
            // player.printHand()
            player.sortHandByValue()
            // player.printHand()
            player.updateBooks()
            // player.printBooks()
            i--
          } else {
            // NEXT PLAYERS TURN
            // console.log(`Dangit maybe next time`)
            // player.printHand()
            player.sortHandByValue()
            // player.printHand()
            player.updateBooks()
            // player.printBooks()
          }
        } else {
          // NEXT PLAYERS TURN
          // console.log(`Dangit no more cards left.... TIME TO GUESS`)
          // player.printHand()
          player.sortHandByValue()
          // player.printHand()
          player.updateBooks()
          // player.printBooks()
        }
      }
    }
  }
}

const playTurn = (players, playerIdx, gameRunning) => {
  if (gameRunning === true) {
    let player = players[playerIdx]
    // console.log(`Player ${player.name} looks at his hand: `)
    // player.printHand()
    // player.printBooks()

    let playerChoiceIdx = player.pickRandomOpponent
    let playerToPickFrom = allPlayers[1]
    console.log(
      `Player ${player.name} chose to pick from player ${playerToPickFrom.name}`
    )
    let fishingTarget = player.fishRandomly()
    console.log(
      `Player ${player.name} says 'do you have any ${fishingTarget.rank}s`
    )
    // console.log(`Player ${playerToPickFrom.name} looks in his hand: `)
    // playerToPickFrom.printHand()
    // playerToPickFrom.printBooks()
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
      }
    }
  } else {
    console.log('GAme is over!!')
    return
  }
}

const printRoundStats = (players, round) => {
  for (let i = 0; i < players.length; i++) {
    console.log(`\n\n\n----------Round Number ${round}--------------\n\n\n`)
    console.log(`Cards left in deck: ${gameDeck.length}`)
    console.log(
      `Number of cards in ${players[i].name}'s hand: ${players[i].hand.length}`
    )
    console.log(
      `Number of books found by ${players[i].name} thus far: ${players[i].numBooks}`
    )
    console.log(
      `number of cards fished or wished so far: ${cardsFishedAndOrWished}`
    )
  }
}

const clearCardsFromTable = () => {
  let cardsToClear = document.querySelectorAll(`.cardStack`)
  cardsToClear.forEach((cardStack) => {
    cardStack.parentNode.removeChild(cardStack)
  })
}

let gameRunning = true

const playGame = () => {
  let player1 = new Player('Jake')
  let cpu1 = new ComputerPlayer('CPU #1')
  let cpu2 = new ComputerPlayer('CPU #2')
  let cpu3 = new ComputerPlayer('CPU #3')
  console.log(player1, cpu1, cpu2, cpu3)

  let allPlayers = [player1, cpu1, cpu2, cpu3]
  clearCardsFromTable()
  console.log('STarting game!!')
  dealCards(allPlayers)
  generatePlayerHandDisplay(allPlayers[0])
  // console.log(`calling play turn`)
  // playTurn(allPlayers, 0, gameRunning)
  for (let i = 0; i < 30; i++) {
    if (getGameScore(allPlayers) === 13) {
      break
    }
    printRoundStats(allPlayers, i)

    letTheRobotsPlay(allPlayers)
    console.log(
      `\n\n\n\n\n\ end of round ${i} current books: ${getGameScore(
        allPlayers
      )}\n\n\n\ `
    )
  }
}

const chooseCard = (e) => {
  console.log('Card was clicked!!!!')
  let infoString = e.target.innerHTML
  console.log(`Card was ${infoString}`)
}

const addEarsToCards = () => {
  let playerHand = document.querySelectorAll(`#player .hand`)
  playerHand.forEach((cardStack) => {
    let newListener = cardStack.addEventListener('click', chooseCard)
  })
}

const generatePlayerHandDisplay = (player) => {
  let handCount = 0
  for (let i = 0; i < player.books.length; i++) {
    if (player.books[i] > 0) {
      let newCardStack = document.createElement('div')
      newCardStack.classList = 'cardStack'
      for (let j = 0; j < player.books[i]; j++) {
        let newCard = document.createElement('div')
        newCard.classList = `card card-${j + 1}`
        let cardInfo = player.hand[handCount]
        newCard.innerHTML = `${cardInfo.rank} ${cardInfo.suit} ${cardInfo.value}`
        handCount++
        newCardStack.appendChild(newCard)
      }
      playerHandDisplay.appendChild(newCardStack)
    }
  }
  addEarsToCards()
}

const appendShark = () => {
  let shark = document.createElement('img')
  shark.src = 'https://i.imgur.com/LkHAYBF.jpg'
  let container = document.querySelector('#gameContainer')
  container.appendChild(shark)
}

// let player2 = new Player()
// player2.addCardToHand(new Card('Five', 'Spades', 3))
// player2.printHand()
// console.log(player2.isInHand(3))
// console.log(player2.isInHand(5))

newGameBtn.addEventListener('click', playGame)

// initDeck(gameDeck)
// printDeck(gameDeck)

// appendShark()
