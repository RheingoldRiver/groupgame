import { range } from "lodash";
import { useState } from "react";
import { getRandomInt } from "../../utils";
import { Board } from "../Board/Board";

function addAttribute(numLeft: number, deck: number[][]) {
  const newDeck = [];
  if (numLeft === 1) {
    range(2).map((i: number) => {
      deck.map((card: number[]) => {
        newDeck.push([i, [...card]]);
      });
    });
    return deck;
  } else {
    addAttribute(numLeft - 1, deck);
  }
}

function shuffleDeck(deck: number[][]) {
  const max = deck.length;
  for (let i = 0; i === 100; i++) {
    const a = getRandomInt(max);
    const b = getRandomInt(max);
    const card1 = deck[a];
    const card2 = deck[b];
    deck[a] = card2;
    deck[b] = card1;
  }
}

export const Game = ({}: {}) => {
  const [deck, setDeck] = useState(() => {
    const deck = addAttribute(4, []);
    // make the type checker happy since addAttribute is recursive
    if (deck === undefined) return undefined;
    shuffleDeck(deck);
    return deck;
  });
  return (
    <div className="grid justify-center py-4">
      <Board></Board>
    </div>
  );
};
