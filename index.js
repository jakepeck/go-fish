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
const suits = ['clubs', 'diamonds', 'hearts', 'spades']
const clubs = [
  'images/clubs/clubs-r02.svg',
  'images/clubs/clubs-r03.svg',
  'images/clubs/clubs-r04.svg',
  'images/clubs/clubs-r05.svg',
  'images/clubs/clubs-r06.svg',
  'images/clubs/clubs-r07.svg',
  'images/clubs/clubs-r08.svg',
  'images/clubs/clubs-r09.svg',
  'images/clubs/clubs-r10.svg',
  'images/clubs/clubs-J.svg',
  'images/clubs/clubs-Q.svg',
  'images/clubs/clubs-K.svg',
  'images/clubs/clubs-A.svg'
]
const diamonds = [
  'images/diamonds/diamonds-r02.svg',
  'images/diamonds/diamonds-r03.svg',
  'images/diamonds/diamonds-r04.svg',
  'images/diamonds/diamonds-r05.svg',
  'images/diamonds/diamonds-r06.svg',
  'images/diamonds/diamonds-r07.svg',
  'images/diamonds/diamonds-r08.svg',
  'images/diamonds/diamonds-r09.svg',
  'images/diamonds/diamonds-r10.svg',
  'images/diamonds/diamonds-J.svg',
  'images/diamonds/diamonds-Q.svg',
  'images/diamonds/diamonds-K.svg',
  'images/diamonds/diamonds-A.svg'
]
const hearts = [
  'images/hearts/hearts-r02.svg',
  'images/hearts/hearts-r03.svg',
  'images/hearts/hearts-r04.svg',
  'images/hearts/hearts-r05.svg',
  'images/hearts/hearts-r06.svg',
  'images/hearts/hearts-r07.svg',
  'images/hearts/hearts-r08.svg',
  'images/hearts/hearts-r09.svg',
  'images/hearts/hearts-r10.svg',
  'images/hearts/hearts-J.svg',
  'images/hearts/hearts-Q.svg',
  'images/hearts/hearts-K.svg',
  'images/hearts/hearts-A.svg'
]
const spades = [
  'images/spades/spades-r02.svg',
  'images/spades/spades-r03.svg',
  'images/spades/spades-r04.svg',
  'images/spades/spades-r05.svg',
  'images/spades/spades-r06.svg',
  'images/spades/spades-r07.svg',
  'images/spades/spades-r08.svg',
  'images/spades/spades-r09.svg',
  'images/spades/spades-r10.svg',
  'images/spades/spades-J.svg',
  'images/spades/spades-Q.svg',
  'images/spades/spades-K.svg',
  'images/spades/spades-A.svg'
]

const gameLog = document.querySelector(`#logDisplay`)

const logToGameLog = (string) => {
  let stringToAdd = document.createElement('p')
  stringToAdd.innerText = string
  gameLog.appendChild(stringToAdd)
}

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
    this.updateBooks()
    this.sortHandByValue()
  }
  addCardsToHand(cards) {
    for (let i = 0; i < cards.length; i++) {
      this.addCardToHand(cards[i])
    }
    this.updateBooks()
    this.sortHandByValue()
  }
  printHand() {
    logToGameLog(`player ${this.name} current hand is: `)
    for (let i = 0; i < this.hand.length; i++) {
      logToGameLog.log(
        this.hand[i].rank +
          ' of ' +
          this.hand[i].suit +
          ' value is ' +
          this.hand[i].value
      )
    }
    logToGameLog(this.hand)
  }
  printBooks() {
    logToGameLog(`player ${this.name} current books are: `)
    logToGameLog(this.books)
  }
  updateBooks() {
    for (let i = 0; i < this.books.length; i++) {
      this.books[i] = 0
    }
    this.hand.forEach((card) => {
      this.books[card.value] += 1
    })

    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i] === 4) {
        logToGameLog(`${this.name} completed a book of ${ranks[i]}s!`)
        this.removeCardsFromHand(i, 4)
        this.numBooks++
        let scoreDisplay = document.querySelector(`#${this.name} h4`)
        scoreDisplay.innerHTML++
      }
    }
  }
  removeCardsFromHand(cardVal, numCards) {
    // function to remove 4 cards in case of book, or all cards of card value
    // if fished  by an opponent
    let cardsToRemove = []
    for (let i = 0; i < this.hand.length; i++) {
      if (
        this.hand[i].value === parseInt(cardVal) &&
        parseInt(numCards) === this.books[this.hand[i].value]
      ) {
        cardsToRemove = this.hand.splice(i, numCards)
      }
    }

    return cardsToRemove
  }

  pickRandomOpponent(playerArr, currentPlayer) {
    let randOpp = Math.floor(Math.random() * playerArr.length)
    if (randOpp === currentPlayer) {
      return this.pickRandomOpponent(playerArr, currentPlayer)
    } else {
      return randOpp
    }
  }

  fishRandomly() {
    let randomFish = this.hand[Math.floor(Math.random() * this.hand.length)]
    return randomFish
  }
  isInHand(cardVal) {
    let isThere = false
    for (let i = 0; i < this.hand.length; i++) {
      if (this.hand[i].value === parseInt(cardVal)) {
        isThere = true
      }
    }
    return isThere
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
    logToGameLog(deck[i])
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
  if (deck.length > 0) {
    let cardDrawn = deck.shift()
    return cardDrawn
  } else {
    gameDeck.classList = 'emptyDeck'
  }
}

const dealCards = (allPlayers) => {
  initDeck(gameDeck)
  shuffleDeck(gameDeck)
  logToGameLog('Dealing has begun!')

  if (allPlayers.length === 2) {
    for (let i = 0; i < allPlayers.length; i++) {
      // 2 players so 7 cards dealt to each
      for (let j = 0; j < 7; j++) {
        let cardDrawn = drawTopCard(gameDeck)
        allPlayers[i].addCardToHand(cardDrawn)
      }
      allPlayers[i].updateBooks()
      allPlayers[i].sortHandByValue()
    }
  } else {
    for (let i = 0; i < allPlayers.length; i++) {
      // 3-4 players so 5 cards dealt to each
      for (let j = 0; j < 5; j++) {
        let cardDrawn = drawTopCard(gameDeck)
        allPlayers[i].addCardToHand(cardDrawn)
      }
      allPlayers[i].updateBooks()
      allPlayers[i].sortHandByValue()
    }
    logToGameLog('Dealing is complete')
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

const letTheHumanFish = (playerToFishFromID, cardValueToFishFor) => {
  // function will take in the player to fish from and proceed with logic
  let goAgain = false
  let humanPlayer = allPlayers[0]
  let playerIndex = playerToFishFromID[playerToFishFromID.length - 1]
  let playerToFishFrom = allPlayers[playerIndex]
  logToGameLog(
    `You ask ${playerToFishFromID} for any ${ranks[cardValueToFishFor]}s`
  )

  if (playerToFishFrom.isInHand(cardValueToFishFor) === true) {
    goAgain = true
    logToGameLog(
      `${playerToFishFrom.name} says "I have ${playerToFishFrom.books[cardValueToFishFor]} of them"`
    )
    cardsFishedAndOrWished++
    let cardsFished = playerToFishFrom.removeCardsFromHand(
      cardValueToFishFor,
      playerToFishFrom.books[cardValueToFishFor]
    )
    humanPlayer.addCardsToHand(cardsFished)

    humanPlayer.updateBooks()
    humanPlayer.sortHandByValue()
    generatePlayerHandDisplay(humanPlayer)
    generateOppHandDisplay(playerToFishFrom)
  } else {
    logToGameLog(`${playerToFishFrom.name} says "Go fish!"`)
    if (gameDeck.length > 0) {
      let fishMyWishCand = drawTopCard(gameDeck)
      humanPlayer.addCardToHand(fishMyWishCand)
      humanPlayer.updateBooks()
      humanPlayer.sortHandByValue()
      generatePlayerHandDisplay(humanPlayer)
      if (fishMyWishCand.value === cardValueToFishFor) {
        logToGameLog('You fished your wish! You get to go again')
        // TIME TO RESET THE PLAYER CHOICE EVENT LISTENERS
        goAgain = true
      }
    }
  }

  if (goAgain === false) {
    letTheRobotsPlay(allPlayers)
    logToGameLog(
      `Who do you want to pick from next? Click on an opponent's hand`
    )
    addEarsToOpponents()
  } else {
    logToGameLog(
      `Who do you want to pick from next? Click on an opponent's hand`
    )
    addEarsToOpponents()
  }
}

const letTheRobotsPlay = (players) => {
  for (let i = 1; i < players.length; i++) {
    if (getGameScore(players) === 13) {
      let winString = getWinner(players)
      logToGameLog(`Game over! THE WINNER IS........... ${winString}`)
      return 0
    }

    let player = players[i]
    logToGameLog(`Player ${player.name}'s Turn!`)
    if (player.hand.length === 0 && gameDeck.length === 0) {
    } else {
      if (player.hand.length === 0 && gameDeck.length > 0) {
        let needToDraw = drawTopCard(gameDeck)
        player.addCardToHand(needToDraw)
        player.updateBooks()
        generateOppHandDisplay(player)
      }

      let playerChoiceIdx = player.pickRandomOpponent(players, i)
      let playerToPickFrom = players[playerChoiceIdx]
      if (playerChoiceIdx === 0) {
        logToGameLog(`Player ${player.name} chose to fish from you`)
      } else {
        logToGameLog(
          `Player ${player.name} chose to fish from ${playerToPickFrom.name}`
        )
      }

      let fishingTarget = player.fishRandomly()
      if (playerChoiceIdx === 0) {
        logToGameLog(
          `Player ${player.name} asks you "Do you have any ${fishingTarget.rank}s?`
        )
      } else {
        logToGameLog(
          `Player ${player.name} says "Do you have any ${fishingTarget.rank}s?" to ${playerToPickFrom.name}`
        )
      }

      if (playerToPickFrom.isInHand(fishingTarget.value) === true) {
        if (playerChoiceIdx === 0) {
          logToGameLog(
            `You say "Yep! I have ${
              playerToPickFrom.books[fishingTarget.value]
            } of em"`
          )
        } else {
          logToGameLog(
            `${playerToPickFrom.name} says "Yep! I have ${
              playerToPickFrom.books[fishingTarget.value]
            } of em"`
          )
        }

        cardsFishedAndOrWished++
        let cardsFished = playerToPickFrom.removeCardsFromHand(
          fishingTarget.value,
          playerToPickFrom.books[fishingTarget.value]
        )
        player.addCardsToHand(cardsFished)
        player.updateBooks()
        player.sortHandByValue()
        generateOppHandDisplay(player)

        if (playerChoiceIdx === 0) {
          generatePlayerHandDisplay(playerToPickFrom)
        }

        i--
      } else {
        if (playerChoiceIdx === 0) {
          logToGameLog(`You say "Nope! Go Fish!"`)
        } else {
          logToGameLog(`${playerToPickFrom.name} says "Nope! Go Fish!"`)
        }

        if (gameDeck.length > 0) {
          let fishMyWishCand = drawTopCard(gameDeck)
          player.addCardToHand(fishMyWishCand)
          player.updateBooks()
          player.sortHandByValue()
          generateOppHandDisplay(player)
          if (fishMyWishCand.value === fishingTarget.value) {
            cardsFishedAndOrWished++
            logToGameLog(
              `${player.name} fished their wish! They get to go again`
            )
            i--
          }
        } else {
          // NEXT PLAYERS TURN

          player.updateBooks()
          player.sortHandByValue()
        }
      }
    }
  }
}

const printRoundStats = (players, round) => {
  for (let i = 0; i < players.length; i++) {
    logToGameLog(`\n\n\n----------Round Number ${round}--------------\n\n\n`)
    logToGameLog(`Cards left in deck: ${gameDeck.length}`)
    logToGameLog(
      `Number of cards in ${players[i].name}'s hand: ${players[i].hand.length}`
    )
    logToGameLog(
      `Number of books found by ${players[i].name} thus far: ${players[i].numBooks}`
    )
    logToGameLog(
      `Number of cards fished or wished so far: ${cardsFishedAndOrWished}`
    )
  }
}

const clearOppCardDisplay = (player) => {
  let tinyCardsOfPlayer = document.querySelectorAll(`#${player.name} .tinyCard`)
  tinyCardsOfPlayer.forEach((tinyCard) => {
    tinyCard.parentNode.removeChild(tinyCard)
  })
}

const clearPlayerCardDisplay = () => {
  let cardsToClear = document.querySelectorAll(`#player .cardStack`)
  cardsToClear.forEach((cardStack) => {
    cardStack.parentNode.removeChild(cardStack)
  })
}

const clearCardsFromTable = () => {
  let cardsToClear = document.querySelectorAll(`.cardStack`)
  cardsToClear.forEach((cardStack) => {
    cardStack.parentNode.removeChild(cardStack)
  })
  cardsToClear = document.querySelectorAll(`.card`)
  cardsToClear.forEach((card) => {
    card.parentNode.removeChild(card)
  })
}

let gameRunning = true

let player1 = new Player('player')
let cpu1 = new ComputerPlayer('cpu1')
let cpu2 = new ComputerPlayer('cpu2')
let cpu3 = new ComputerPlayer('cpu3')
let allPlayers = [player1, cpu1, cpu2, cpu3]

const playGame = () => {
  player1 = new Player('player')
  cpu1 = new ComputerPlayer('cpu1')
  cpu2 = new ComputerPlayer('cpu2')
  cpu3 = new ComputerPlayer('cpu3')

  allPlayers = [player1, cpu1, cpu2, cpu3]
  clearCardsFromTable()
  logToGameLog('Starting new game!!!')
  dealCards(allPlayers)
  generatePlayerHandDisplay(allPlayers[0])
  generateOppHandDisplay(allPlayers[1])
  generateOppHandDisplay(allPlayers[2])
  generateOppHandDisplay(allPlayers[3])
  logToGameLog(`Who do you want to pick from? Click an opponent's hand`)
  addEarsToOpponents()
}

const addEarsToOpponents = () => {
  let opponents = document.querySelector(`#cpu1 .hand`)
  opponents.addEventListener('click', choosePlayer)
  let opponents2 = document.querySelector(`#cpu2 .hand`)
  opponents2.addEventListener('click', choosePlayer)
  let opponents3 = document.querySelector(`#cpu3 .hand`)
  opponents3.addEventListener('click', choosePlayer)
}

const removeEarsFromOpponents = () => {
  let opponents = document.querySelector(`#cpu1 .hand`)
  opponents.removeEventListener('click', choosePlayer)
  let opponents2 = document.querySelector(`#cpu2 .hand`)
  opponents2.removeEventListener('click', choosePlayer)
  let opponents3 = document.querySelector(`#cpu3 .hand`)
  opponents3.removeEventListener('click', choosePlayer)
}

let playerTarget = ''
let cardTarget = 0

const choosePlayer = (e) => {
  let infoString = e.target.parentNode.parentNode.id
  if (infoString === 'oppsAndDeck') {
    infoString = e.target.parentNode.id
  }
  logToGameLog(`You chose to fish from ${infoString}`)
  playerTarget = infoString
  removeEarsFromOpponents()
  logToGameLog('Click a card in your hand to fish for!')
  addEarsToCards()
}

const chooseCard = (e) => {
  let infoString = e.target.innerHTML
  cardTarget = infoString
  removeEarsFromCards()
  // now we have chosen a player and a card, we need to run game logic
  if (infoString[infoString.length - 2] === ' ') {
    letTheHumanFish(playerTarget, infoString[infoString.length - 1])
  } else {
    letTheHumanFish(
      playerTarget,
      infoString[infoString.length - 2] + infoString[infoString.length - 1]
    )
  }
}

const addEarsToCards = () => {
  let playerHand = document.querySelectorAll(`#player .hand`)
  playerHand.forEach((cardStack) => {
    let newListener = cardStack.addEventListener('click', chooseCard)
  })
}

const removeEarsFromCards = () => {
  let playerHand = document.querySelectorAll(`#player .hand`)
  playerHand.forEach((cardStack) => {
    cardStack.removeEventListener('click', chooseCard)
  })
}

const generateOppHandDisplay = (player) => {
  clearOppCardDisplay(player)
  let handCount = 0
  let oppHand = document.querySelector(`#${player.name} .hand`)
  for (let i = 0; i < player.hand.length; i++) {
    let newOppCard = document.createElement('div')
    newOppCard.classList = `card tinyCard`
    newOppCard.setAttribute('id', `faceDown`)
    newOppCard.style.left = `${i * 5}px`
    oppHand.appendChild(newOppCard)
  }
  oppHand.style.margin = `0px 0px 0px -${player.hand.length * 1}px`
}

const getCardImg = (cardValue, cardSuit) => {
  if (cardSuit === 'spades') {
    return spades[cardValue]
  } else if (cardSuit === 'clubs') {
    return clubs[cardValue]
  } else if (cardSuit === 'diamonds') {
    return diamonds[cardValue]
  } else {
    return hearts[cardValue]
  }
}

const generatePlayerHandDisplay = (player) => {
  clearPlayerCardDisplay()
  player.updateBooks()
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
        let bg = getCardImg(cardInfo.value, cardInfo.suit)
        newCard.style.backgroundImage = `url(${bg})`
        newCard.style.backgroundSize = '100%'
        handCount++
        newCardStack.appendChild(newCard)
      }
      playerHandDisplay.appendChild(newCardStack)
    }
  }
}

newGameBtn.addEventListener('click', playGame)
