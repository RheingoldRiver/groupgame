import { createContext, ReactNode, useEffect } from "react";
import { useState } from "react";
import { CardType } from "../Card/cardTypes";
import { DEFAULT_DECK, DEFAULT_GAME_STATE, InvalidCard, Mode, MODE_SETTINGS, Orientation } from "./gameConstants";
import { addAttribute, getCard, removeCards, shuffleDeck, validateGroup } from "./gameHelpers";

export const GameStateContext = createContext(DEFAULT_GAME_STATE);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [currentGroup, setCurrentGroup] = useState<CardType[]>([]);
  const [invalidGroup, setInvalidGroup] = useState<InvalidCard[]>([]);
  const [mode, setMode] = useState<Mode>(Mode.Set);
  const [orientation, setOrientation] = useState<Orientation>(Orientation.Vertical);
  const [invalidDelay, setInvalidDelay] = useState<number>(2.5);
  const [numAttributes, setNumAttributes] = useState<number>(4);
  const [deck, setDeck] = useState<CardType[]>(() => {
    const baseDeck = DEFAULT_DECK;
    const tempDeck = addAttribute(numAttributes - 1, baseDeck);
    // make the type checker happy since addAttribute is recursive
    if (tempDeck === undefined) return baseDeck;
    shuffleDeck(tempDeck);
    return tempDeck;
  });
  const [boardSize, setBoardSize] = useState<number>(() => {
    return MODE_SETTINGS[mode].boardSize;
  });

  function handleCardClick(card: CardType) {
    const cardsPerGroup = MODE_SETTINGS[mode].groupSize;

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
    if (newCurrentGroup.length <= cardsPerGroup - 1) {
      setCurrentGroup(newCurrentGroup);
      return;
    }
    if (validateGroup(newCurrentGroup)) {
      const newDeck = removeCards(deck, newCurrentGroup, boardSize, cardsPerGroup);
      setCurrentGroup([]);
      setDeck(newDeck);
    } else {
      setInvalidGroup(
        newCurrentGroup.map((c) => {
          return {
            card: c,
            destroy: () => {
              setTimeout(() => {
                setInvalidGroup((prev) => {
                  return prev.filter((ic) => {
                    return ic.card.id !== c.id;
                  });
                });
              }, invalidDelay * 1000);
            },
          };
        })
      );
      setCurrentGroup([]);
    }
  }

  useEffect(() => {
    if (invalidGroup.length === 0) return;
    invalidGroup.map((ic) => ic.destroy());
  }, [invalidGroup]);

  return (
    <GameStateContext.Provider value={{ deck, handleCardClick, currentGroup, invalidGroup }}>
      {children}
    </GameStateContext.Provider>
  );
}
