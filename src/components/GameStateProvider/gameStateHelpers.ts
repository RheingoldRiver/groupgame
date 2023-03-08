import { Mode } from "./gameStateConstants";
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
  for (let k = 0; k < 100; k++) {
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

export function removeCards(deck: CardType[], matchedGroup: CardType[], boardSize: number, groupSize: number) {
  const newDeck = [];
  let j = 0;
  for (let i in deck) {
    let card = deck[i];
    if (toNumber(i) >= boardSize + groupSize) {
      newDeck.push(card);
    } else if (toNumber(i) >= boardSize) {
      continue;
    } else if (!matchedGroup.includes(card)) {
      newDeck.push(card);
    } else {
      // TODO: Handle end of game gracefully here
      newDeck.push(deck[boardSize + j]);
      j++;
    }
  }
  return newDeck;
}

export function validateGroup(possibleGroup: CardType[], mode: Mode) {
  let isValid = true;
  if (mode == Mode.Set) {
    for (let i in possibleGroup[0].vector) {
      // in which I write the entire game in 1 line of code
      // prettier-ignore
      if (
      possibleGroup.reduce((sum, card) => {
        return sum + card.vector[i];
      }, 0) % 3 !== 0
    ) {
      isValid = false;
    }
    }
  }
  return isValid;
}

export function findValidGroups(board: CardType[], mode: Mode): CardType[][] {
  const foundGroups: CardType[][] = [];
  for (let i = 1; i < board.length - 2; i++) {
    for (let j = i + 1; j < board.length - 1; j++) {
      for (let k = j + 1; j < board.length; j++) {
        const possibleGroup = [board[i], board[j], board[k]];
        if (validateGroup(possibleGroup, mode)) {
          foundGroups.push(possibleGroup);
        }
      }
    }
  }
  return foundGroups;
}
