import { createContext, ReactNode, useEffect } from "react";
import { range } from "lodash";
import { useState } from "react";
import { getRandomInt } from "../../utils";
import { CardType } from "../Card/cardTypes";

interface GameState {
  deck: CardType[];
  handleCardClick: Function;
  currentGroup: CardType[];
  invalidGroup: CardType[];
}

const DEFAULT_GAME_STATE: GameState = {
  deck: [],
  handleCardClick: () => {},
  currentGroup: [],
  invalidGroup: [],
};

const DEFAULT_DECK = [
  { id: crypto.randomUUID(), vector: [0] },
  { id: crypto.randomUUID(), vector: [1] },
  { id: crypto.randomUUID(), vector: [2] },
];

export const GameStateContext = createContext(DEFAULT_GAME_STATE);

function addAttribute(numLeft: number, deck: CardType[]): CardType[] {
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

function shuffleDeck(deck: CardType[]) {
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

function getCard(deck: CardType[], id: string): CardType | undefined {
  for (let card of deck) {
    if (card.id === id) {
      return card;
    }
  }
  return undefined;
}

function validateGroup(possibleGroup: CardType[]) {
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

function removeCards(deck: CardType[], matchedGroup: CardType[]) {
  const newDeck = [...deck];
  return newDeck.filter((card) => {
    return !matchedGroup.includes(card);
  });
}

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [deck, setDeck] = useState<CardType[]>(() => {
    const baseDeck = DEFAULT_DECK;
    const tempDeck = addAttribute(3, baseDeck);
    // make the type checker happy since addAttribute is recursive
    if (tempDeck === undefined) return baseDeck;
    shuffleDeck(tempDeck);
    return tempDeck;
  });
  const [currentGroup, setCurrentGroup] = useState<CardType[]>([]);
  const [invalidGroup, setInvalidGroup] = useState<CardType[]>([]);

  function handleCardClick(card: CardType) {
    // Since we instantly remove any card you click on twice, we don't have to
    // worry about any case of potentially adding the same card 3x in the
    // validation function. Hooray!
    if (getCard(currentGroup, card.id) !== undefined) {
      setCurrentGroup(
        currentGroup.filter((c) => {
          return c.id !== card.id;
        })
      );
      return;
    }
    const newCurrentGroup = [...currentGroup, card];

    // Don't remove from deck yet, we'll do that when we complete a group
    if (newCurrentGroup.length <= 2) {
      setCurrentGroup(newCurrentGroup);
      return;
    }
    if (validateGroup(newCurrentGroup)) {
      const tempDeck = [...deck];
      const newDeck = removeCards(tempDeck, newCurrentGroup);
      setCurrentGroup([]);
      setDeck(newDeck);
    } else {
      setInvalidGroup(newCurrentGroup);
      setCurrentGroup(invalidGroup);
    }
  }
  useEffect(() => {
    if (invalidGroup.length === 0) return;
    function clearInvalidGroup() {
      setInvalidGroup([]);
    }

    setTimeout(clearInvalidGroup, 5000);
  }, [invalidGroup]);

  return (
    <GameStateContext.Provider value={{ deck, handleCardClick, currentGroup, invalidGroup }}>
      {children}
    </GameStateContext.Provider>
  );
}
