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
    console.log(this.hand)
  }
  printBooks() {
    console.log(`player ${this.name} current books are: `)
    console.log(this.books)
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
        console.log(`\n\n\n-----FINALLY A BOOK FOUND!!!!----\n\n\n`)
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
    this.sortHandByValue()
    for (let i = 0; i < this.hand.length; i++) {
      if (
        this.hand[i].value === cardVal &&
        numCards === this.books[this.hand[i].value]
      ) {
        cardsToRemove = this.hand.splice(i, numCards)
      }
    }
    this.updateBooks()
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
  let cardDrawn = deck.shift()
  return cardDrawn
}

const dealCards = (allPlayers) => {
  console.log('deal cards clicked')
  initDeck(gameDeck)
  shuffleDeck(gameDeck)

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
        let cardDrawn = drawTopCard(gameDeck)
        allPlayers[i].addCardToHand(cardDrawn)
      }
      allPlayers[i].updateBooks()
      allPlayers[i].sortHandByValue()
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

const letTheHumanFish = (playerToFishFromID, cardValueToFishFor) => {
  // function will take in the player to fish from and proceed with logic
  let goAgain = false
  let humanPlayer = allPlayers[0]
  let playerIndex = playerToFishFromID[playerToFishFromID.length - 1]
  let playerToFishFrom = allPlayers[playerIndex]
  console.log(
    `letTheHumanFish has been called the player to fish from is ${playerToFishFromID} and the playerIndex is ${playerIndex}`
  )
  if (playerToFishFrom.isInHand(cardValueToFishFor) === true) {
    console.log(`The card you fished for was in ${playerToFishFromID}'s hand`)
    cardsFishedAndOrWished++
    let cardsFished = playerToFishFrom.removeCardsFromHand(
      cardValueToFishFor,
      playerToFishFrom.books[cardValueToFishFor]
    )
    humanPlayer.addCardsToHand(cardsFished)
    generatePlayerHandDisplay(humanPlayer)
    generateOppHandDisplay(playerToFishFrom)
  } else {
    console.log('Not in their hand! Time to draw')
    if (gameDeck.length > 0) {
      console.log('player hand before drawing:')
      humanPlayer.printHand()
      let fishMyWishCand = drawTopCard(gameDeck)
      humanPlayer.addCardToHand(fishMyWishCand)

      humanPlayer.updateBooks()
      console.log('after')
      humanPlayer.printHand()
      generatePlayerHandDisplay(humanPlayer)
      if (fishMyWishCand.value === cardValueToFishFor) {
        console.log('Fished my wish! I get to go again')
        // TIME TO RESET THE PLAYER CHOICE EVENT LISTENERS
        goAgain = true
        console.log('who do you want to pick from')
        addEarsToOpponents()
      }
    }

    if (goAgain === false) {
      console.log('time to let the cpus play a round')
      letTheRobotsPlay(allPlayers)
      console.log('who do you want to pick from')
      addEarsToOpponents()
    }
  }
}

const letTheRobotsPlay = (players) => {
  for (let i = 1; i < players.length; i++) {
    if (getGameScore(players) === 13) {
      let winString = getWinner(players)
      console.log(`Game over!!!!!!!THE WINNER ISSS........... ${winString}`)
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
        generateOppHandDisplay(player)
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
        generateOppHandDisplay(player)

        if (playerChoiceIdx === 0) {
          generatePlayerHandDisplay(playerToPickFrom)
        }
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
          player.sortHandByValue()
          player.updateBooks()
          generateOppHandDisplay(player)
          if (fishMyWishCand.value === fishingTarget.value) {
            cardsFishedAndOrWished++
            // console.log(`Fished my wish!!!!`)
            i--
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
console.log(player1, cpu1, cpu2, cpu3)
let allPlayers = [player1, cpu1, cpu2, cpu3]

const playGame = () => {
  player1 = new Player('player')
  cpu1 = new ComputerPlayer('cpu1')
  cpu2 = new ComputerPlayer('cpu2')
  cpu3 = new ComputerPlayer('cpu3')
  console.log(player1, cpu1, cpu2, cpu3)

  allPlayers = [player1, cpu1, cpu2, cpu3]
  clearCardsFromTable()
  console.log('STarting game!!')
  dealCards(allPlayers)
  generatePlayerHandDisplay(allPlayers[0])
  generateOppHandDisplay(allPlayers[1])
  generateOppHandDisplay(allPlayers[2])
  generateOppHandDisplay(allPlayers[3])
  console.log('who do you want to pick from')
  addEarsToOpponents()
  // console.log(`calling play turn`)
  // playTurn(allPlayers, 0, gameRunning)
  // for (let i = 0; i < 30; i++) {
  //   if (getGameScore(allPlayers) === 13) {
  //     break
  //   }
  //   printRoundStats(allPlayers, i)

  //   letTheRobotsPlay(allPlayers)
  //   console.log(
  //     `\n\n\n\n\n\ end of round ${i} current books: ${getGameScore(
  //       allPlayers
  //     )}\n\n\n\ `
  //   )
  // }
}

const addEarsToOpponents = () => {
  let opponents = document.querySelector(`#cpu1 .hand`)
  // opponents.innerHTML = 'cpu1'
  opponents.addEventListener('click', choosePlayer)
  let opponents2 = document.querySelector(`#cpu2 .hand`)
  // opponents2.innerHTML = 'cpu2'
  opponents2.addEventListener('click', choosePlayer)
  let opponents3 = document.querySelector(`#cpu3 .hand`)
  // opponents3.innerHTML = 'cpu3'
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
  console.log('A player was picked!')
  console.log(e.target.parentNode)
  console.log(e.target.parentNode.parentNode.id)
  let infoString = e.target.parentNode.parentNode.id
  if (infoString === 'oppsAndDeck') {
    infoString = e.target.parentNode.id
  }
  console.log(`Player ${infoString} was picked`)
  playerTarget = infoString
  removeEarsFromOpponents()
  console.log('Make your choice for your card')
  addEarsToCards()
}

const chooseCard = (e) => {
  console.log(playerTarget)
  console.log('Card was clicked!!!!')
  let infoString = e.target.innerHTML
  console.log(`Card was ${infoString}`)
  cardTarget = infoString
  removeEarsFromCards()
  // now we have chosen a player and a card, we need to run game logic
  letTheHumanFish(playerTarget, infoString[infoString.length - 1])
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
  // let oppCardCont = document.createElement('div')
  // oppCardCont.classList = `oppCardContainer`
  let rotFactor = 180 / (player.hand.length - 1)
  for (let i = 0; i < player.hand.length; i++) {
    let newOppCard = document.createElement('div')
    newOppCard.classList = `card tinyCard`
    newOppCard.setAttribute('id', `faceDown`)
    newOppCard.style.left = `${i * 5}px`
    // newOppCard.style.transform = `rotate(${270 + rotFactor * i}deg)`
    oppHand.appendChild(newOppCard)
  }
  oppHand.style.margin = `0px 0px 0px -${player.hand.length * 1}px`
  // oppHand.appendChild(oppCardCont)
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
        newCard.style.backgroundSize = '98%'
        console.log(bg)
        // newCard.style.backgroundImg = getCardImg(cardInfo.value, cardInfo.suit)
        handCount++
        newCardStack.appendChild(newCard)
      }
      playerHandDisplay.appendChild(newCardStack)
    }
  }
}

const appendShark = () => {
  let shark = document.createElement('img')
  shark.setAttribute('id', 'sharkImg')
  shark.src = 'https://i.imgur.com/LkHAYBF.jpg'
  let container = document.querySelector('#hero')
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
