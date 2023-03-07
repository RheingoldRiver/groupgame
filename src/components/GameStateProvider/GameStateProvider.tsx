import { createContext, ReactNode, useEffect } from "react";
import { range } from "lodash";
import { useState } from "react";
import { getRandomInt } from "../../utils";

interface GameState {
  deck: CardState[];
  handleCardClick: Function;
  currentGroup: CardState[];
  invalidGroup: CardState[];
}

const DEFAULT_GAME_STATE: GameState = {
  deck: [],
  handleCardClick: () => {},
  currentGroup: [],
  invalidGroup: [],
};

export interface CardState {
  id: string;
  vector: number[];
}

const DEFAULT_DECK = [
  { id: crypto.randomUUID(), vector: [0] },
  { id: crypto.randomUUID(), vector: [1] },
  { id: crypto.randomUUID(), vector: [2] },
];

export const GameStateContext = createContext(DEFAULT_GAME_STATE);

function addAttribute(numLeft: number, deck: CardState[]): CardState[] {
  if (numLeft === 0) {
    return deck;
  }
  const newDeck: CardState[] = [];
  range(3).map((i: number) => {
    deck.map((card: CardState) => {
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

function shuffleDeck(deck: CardState[]) {
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

function getCard(deck: CardState[], id: string): CardState {
  for (let card of deck) {
    if (card.id === id) {
      return card;
    }
  }
  throw new Error("invalid card id sent to getCard");
}

function validateGroup(possibleGroup: CardState[]) {
  let isValid = true;
  for (let i in possibleGroup[0].vector) {
    // in which I write the entire game in 1 line of code
    if (
      possibleGroup.reduce((sum, card) => {
        return sum + card.vector[i];
      }, 0) %
        3 !==
      0
    )
      isValid = false;
  }
  return isValid;
}

function removeCards(deck: CardState[], matchedGroup: CardState[]) {
  const newDeck = [...deck];
  return newDeck.filter((card) => {
    return !matchedGroup.includes(card);
  });
}

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [deck, setDeck] = useState<CardState[]>(() => {
    const baseDeck = DEFAULT_DECK;
    const tempDeck = addAttribute(3, baseDeck);
    // make the type checker happy since addAttribute is recursive
    if (tempDeck === undefined) return baseDeck;
    shuffleDeck(tempDeck);
    return tempDeck;
  });
  const [currentGroup, setCurrentGroup] = useState<CardState[]>([]);
  const [invalidGroup, setInvalidGroup] = useState<CardState[]>([]);

  function handleCardClick(id: string) {
    const newCurrentGroup = [...currentGroup, getCard(deck, id)];
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
