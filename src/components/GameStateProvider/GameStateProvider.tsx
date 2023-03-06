import { createContext, ReactNode } from "react";
import { range } from "lodash";
import { useState } from "react";
import { getRandomInt } from "../../utils";

interface GameState {
  deck: number[][];
}

const DEFAULT_GAME_STATE: GameState = {
  deck: [],
};

export const GameStateContext = createContext(DEFAULT_GAME_STATE);

function addAttribute(numLeft: number, deck: number[][]): number[][] {
  if (numLeft === 0) {
    return deck;
  }
  const newDeck: number[][] = [];
  range(3).map((i: number) => {
    deck.map((card: number[]) => {
      newDeck.push([i, ...card]);
    });
  });
  return addAttribute(numLeft - 1, newDeck);
}

function shuffleDeck(deck: number[][]) {
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
  const [deck, setDeck] = useState<number[][]>(() => {
    const baseDeck = [[0], [1], [2]];
    const tempDeck = addAttribute(3, baseDeck);
    // make the type checker happy since addAttribute is recursive
    if (tempDeck === undefined) return baseDeck;
    shuffleDeck(tempDeck);
    return tempDeck;
  });

  return <GameStateContext.Provider value={{ deck }}>{children}</GameStateContext.Provider>;
}
