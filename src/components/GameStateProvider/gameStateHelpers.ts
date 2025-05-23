import { DEFAULT_DECK, Mode } from "./gameStateConstants";
import { range, toNumber } from "lodash";
import { getRandomInt } from "../../utils";
import { CardType } from "../Card/cardTypes";

// Deck construction

export function addAttribute(numLeft: number, deck: CardType[]): CardType[] {
  if (numLeft === 0) {
    return deck;
  }
  const newDeck: CardType[] = [];
  range(3).map((i: number) => {
    deck.map((card: CardType) => {
      newDeck.push({
        // We will throw out previous ids, there is no reason to save them
        // because the deck was not constructed fully yet & we have not used them
        // for anything. If there was some reason to preserve them, this might be
        // a more difficult thing to do
        id: crypto.randomUUID(),
        vector: [i, ...card.vector],
      });
    });
  });
  return addAttribute(numLeft - 1, newDeck);
}

export function shuffleDeck(deck: CardType[]) {
  const max = deck.length;
  for (let k = 0; k < max * 10; k++) {
    const a = getRandomInt(max);
    const b = getRandomInt(max);
    const card1 = deck[a];
    const card2 = deck[b];
    deck[a] = card2;
    deck[b] = card1;
  }
}

// Utility

export function getCard(deck: CardType[], id: string): CardType | undefined {
  for (let card of deck) {
    if (card.id === id) {
      return card;
    }
  }
  return undefined;
}

export function board(deck: CardType[], boardSize: number): CardType[] {
  const board = deck.slice(0, boardSize);
  return board;
}

// Gameplay

export function buildDeck(numAttributes: number, mode: Mode) {
  const baseDeck = DEFAULT_DECK;
  const tempDeck = addAttribute(numAttributes - 1, baseDeck);
  // make the type checker happy since addAttribute is recursive
  if (tempDeck === undefined) return baseDeck;
  shuffleDeck(tempDeck);
  return tempDeck;
}

export function takePlayerFoundGroups(
  deck: CardType[],
  matchedGroup: CardType[],
  boardSize: number,
  groupSize: number,
  didDecrement: boolean
) {
  const newDeck = [];
  let newSetIndices = range(groupSize);
  if (didDecrement) {
    boardSize = boardSize - groupSize;
    let k = 0;
    for (let i = boardSize; i < boardSize + groupSize; i++) {
      if (matchedGroup.includes(deck[i])) {
        newSetIndices = newSetIndices.filter((item) => item != k);
      }
      k++;
    }
  }
  let j = 0;
  for (let i in deck) {
    let card = deck[i];
    if (toNumber(i) >= boardSize + groupSize) {
      // rest of the deck
      newDeck.push(card);
    } else if (toNumber(i) >= boardSize) {
      // skip the immediate next groupSize cards that we've already claimed in the last step
      continue;
    } else if (!matchedGroup.includes(card)) {
      // the cards that we didn't pick up this turn
      newDeck.push(card);
    } else {
      // replace the cards in this Group with the immediate next cards in the deck
      newDeck.push(deck[boardSize + newSetIndices[j]]);
      j++;
    }
  }
  return newDeck;
}

export function validateGroup(possibleGroup: CardType[], mode: Mode) {
  let isValid = true;
  if (mode == Mode.Set) {
    isValid = validateSet(possibleGroup);
  } else if (mode == Mode.Planet) {
    isValid = validatePlanet(possibleGroup);
  }
  return isValid;
}

function validateSet(possibleGroup: CardType[]) {
  let isValid = true;
  // we don't know the length of the card, but we can assume all cards have the same length
  for (let i in possibleGroup[0].vector) {
    // in which I write the entire game in 1 line of code
    // prettier-ignore
    if (
      possibleGroup.reduce((sum, card) => {
        return sum + card.vector[i];
      }, 0) % 3 !== 0
    ) { isValid = false; }
  }
  return isValid;
}

// export for testing
export function validatePlanet(possibleGroup: CardType[]) {
  // We don't know what order in which the user clicked the planet. AB - DE is the invariant
  // for a planet, however the user may have clicked in the order A, D, E, B. Therefore, we
  // have to check every combinatorially distinct possibility of cards in our vector for
  // a possible planet.
  let firstValid = true;
  let secondValid = true;
  let thirdValid = true;
  let pg = possibleGroup.map((c) => c.vector);
  // we don't know the length of the card, but we can assume all cards have the same length
  for (let i in possibleGroup[0].vector) {
    // These are the only possibilities. 4! = 24 but the subtraction is commutative in this
    // case (since 0 mod 3) and addition is always commutative so 24 / (2 * 2 * 2)
    // = 24 / 8 = 3.
    if ((pg[0][i] + pg[1][i] - pg[2][i] - pg[3][i]) % 3 !== 0) {
      firstValid = false;
    }
    if ((pg[0][i] + pg[2][i] - pg[1][i] - pg[3][i]) % 3 !== 0) {
      secondValid = false;
    }
    if ((pg[0][i] + pg[3][i] - pg[1][i] - pg[2][i]) % 3 !== 0) {
      thirdValid = false;
    }
  }
  return firstValid || secondValid || thirdValid;
}

export function findValidGroups(board: CardType[], mode: Mode, cardsToIgnore?: CardType[]): CardType[][] {
  // console.log(board.length);
  if (mode === Mode.Set) {
    return findValidSets(board, cardsToIgnore);
  } else if (mode === Mode.Planet) {
    return findValidPlanets(board, cardsToIgnore);
  }
  throw new Error("Unsupported Mode");
}

function findValidSets(board: CardType[], cardsToIgnore?: CardType[]) {
  if (!cardsToIgnore) cardsToIgnore = [];
  const foundGroups: CardType[][] = [];
  for (let i = 0; i < board.length - 2; i++) {
    if (cardsToIgnore.includes(board[i])) continue;
    for (let j = i + 1; j < board.length - 1; j++) {
      if (cardsToIgnore.includes(board[j])) continue;
      for (let k = j + 1; k < board.length; k++) {
        if (cardsToIgnore.includes(board[k])) continue;
        const possibleGroup = [board[i], board[j], board[k]];
        if (validateSet(possibleGroup)) {
          foundGroups.push(possibleGroup);
        }
      }
    }
  }
  return foundGroups;
}

function findValidPlanets(board: CardType[], cardsToIgnore?: CardType[]) {
  if (!cardsToIgnore) cardsToIgnore = [];
  const foundGroups: CardType[][] = [];
  for (let i = 0; i < board.length - 3; i++) {
    if (cardsToIgnore.includes(board[i])) continue;
    for (let j = i + 1; j < board.length - 2; j++) {
      if (cardsToIgnore.includes(board[j])) continue;
      for (let k = j + 1; k < board.length - 1; k++) {
        if (cardsToIgnore.includes(board[k])) continue;
        for (let l = k + 1; l < board.length; l++) {
          if (cardsToIgnore.includes(board[l])) continue;
          const possibleGroup = [board[i], board[j], board[k], board[l]];
          // console.log("i" + i);
          // console.log("j" + j);
          // console.log("k" + k);
          // console.log(board[i]);
          // console.log(board[j]);
          // console.log(board[k]);
          if (validatePlanet(possibleGroup)) {
            // console.log(possibleGroup);
            foundGroups.push(possibleGroup);
          }
        }
      }
    }
  }
  return foundGroups;
}
