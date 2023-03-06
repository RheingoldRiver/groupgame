import { createContext, ReactNode } from "react";
import { range } from "lodash";
import { useState } from "react";
import { getRandomInt } from "../../utils";

interface GameState {
  deck: CardState[];
}

const DEFAULT_GAME_STATE: GameState = {
  deck: [],
};

export interface CardState {
  id: string;
  vector: number[];
}

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

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [deck, setDeck] = useState<CardState[]>(() => {
    const baseDeck = [
      { id: crypto.randomUUID(), vector: [0] },
      { id: crypto.randomUUID(), vector: [1] },
      { id: crypto.randomUUID(), vector: [2] },
    ];
    const tempDeck = addAttribute(3, baseDeck);
    // make the type checker happy since addAttribute is recursive
    if (tempDeck === undefined) return baseDeck;
    shuffleDeck(tempDeck);
    return tempDeck;
  });

  return <GameStateContext.Provider value={{ deck }}>{children}</GameStateContext.Provider>;
}
