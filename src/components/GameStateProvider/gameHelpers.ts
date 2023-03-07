import { range } from "lodash";
import { getRandomInt } from "../../utils";
import { CardType } from "../Card/cardTypes";

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

export function getCard(deck: CardType[], id: string): CardType | undefined {
  for (let card of deck) {
    if (card.id === id) {
      return card;
    }
  }
  return undefined;
}

export function validateGroup(possibleGroup: CardType[]) {
  let isValid = true;
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
  return isValid;
}

export function removeCards(deck: CardType[], matchedGroup: CardType[]) {
  const newDeck = [...deck];
  return newDeck.filter((card) => {
    return !matchedGroup.includes(card);
  });
}