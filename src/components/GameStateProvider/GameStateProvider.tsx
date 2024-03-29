import { createContext, ReactNode, useEffect } from "react";
import { useState } from "react";
import { CardType } from "../Card/cardTypes";
import { DEFAULT_GAME_STATE, HandleNoGroups, InvalidCard, Mode, MODE_SETTINGS } from "./gameStateConstants";
import { board, buildDeck, findValidGroups, getCard, takePlayerFoundGroups, validateGroup } from "./gameStateHelpers";

export const GameStateContext = createContext(DEFAULT_GAME_STATE);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [currentGroup, setCurrentGroup] = useState<CardType[]>([]);
  const [invalidGroup, setInvalidGroup] = useState<InvalidCard[]>([]);
  const [mode, setMode] = useState<Mode>(Mode.Set);
  const [invalidDelay, setInvalidDelay] = useState<number>(2.5);
  const [numAttributes, setNumAttributes] = useState<number>(4);
  const [handleNoGroups, setHandleNoGroups] = useState<HandleNoGroups>(HandleNoGroups.Auto);
  const [deck, setDeck] = useState<CardType[]>(() => {
    return buildDeck(numAttributes, mode);
  });
  const [thisDeck, setThisDeck] = useState<CardType[]>(() => {
    return deck;
  });
  const [boardSize, setBoardSize] = useState<number>(() => {
    return MODE_SETTINGS[mode].boardSize;
  });
  const [hint, setHint] = useState<CardType | undefined>(undefined);
  const [answer, setAnswer] = useState<CardType[]>([]);
  const [turn, setTurn] = useState<number>(0);
  const [endOfGame, setEndOfGame] = useState<boolean>(false);

  useEffect(() => {
    document.title = `Playing ${mode} | Group Game, the game of 0 mod 3 (a finite simple group)!`;
  }, [mode]);

  function startOfGame() {
    setCurrentGroup([]);
    setInvalidGroup([]);
    setHint(undefined);
    setAnswer([]);
    setTurn(0);
    setBoardSize(MODE_SETTINGS[mode].boardSize);
    setEndOfGame(false);
  }

  function newGame() {
    startOfGame();
    const newDeck = buildDeck(numAttributes, mode);
    setDeck(newDeck);
    setThisDeck(newDeck);
  }

  function startOver() {
    setDeck(thisDeck);
    startOfGame();
  }

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

    // Deal with pre-existing hint
    if (hint?.id === card.id) {
      setHint(undefined);
    } else if (hint !== undefined) {
      newCurrentGroup.push(hint);
      setHint(undefined);
    }

    setAnswer((prev) => {
      return prev.filter((c) => {
        return c.id !== card.id;
      });
    });

    // Don't remove from deck yet, we'll do that when we complete a group
    if (newCurrentGroup.length <= cardsPerGroup - 1) {
      setCurrentGroup(newCurrentGroup);
      return;
    }
    if (validateGroup(newCurrentGroup, mode)) {
      if (cardsPerGroup + boardSize > deck.length) {
        setEndOfGame(true);
        return;
      }
      // The size decrement happens prior to the Card dealing. Then we deal the cards that were
      // previously on the board visible into the slots that now occupy the newly-empty
      // group squares.
      let didDecrement = false;
      const incrementSize = MODE_SETTINGS[mode].incrementSize;
      if (shouldDecrementSize(newCurrentGroup)) {
        decrementSize(incrementSize);
        didDecrement = true;
      }
      const newDeck = takePlayerFoundGroups(deck, newCurrentGroup, boardSize, cardsPerGroup, didDecrement);
      setCurrentGroup([]);
      setDeck(newDeck);
      setTurn(turn + 1);
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

  function shouldDecrementSize(cardsToIgnore: CardType[]) {
    if (turn === 0) return false;
    if (boardSize <= MODE_SETTINGS[mode].boardSize) return false;
    return findValidGroups(board(deck, boardSize), mode, cardsToIgnore).length > 0;
  }

  function decrementSize(incrementSize: number) {
    // in this case we do nothing. Don't deal out more cards. There's a set here
    // already. We're good. Yay.
    setBoardSize(boardSize - incrementSize);
    return;
  }

  useEffect(() => {
    if (invalidGroup.length === 0) return;
    invalidGroup.map((ic) => ic.destroy());
  }, [invalidGroup]);

  useEffect(() => {
    // Adjust the board size if no sets are found
    // Decreasing the board size must be done concurrently with a card deal
    // and so we will do that in the removeCards function.

    const incrementSize = MODE_SETTINGS[mode].incrementSize;

    if (handleNoGroups !== HandleNoGroups.Auto) return;
    if (findValidGroups(board(deck, boardSize), mode).length > 0) return;

    // Make sure the game hasn't reached the end of the deck yet
    if (boardSize + incrementSize > deck.length) {
      setEndOfGame(true);
      return;
    }

    setBoardSize(boardSize + incrementSize);

    // put boardSize in deps so we can rerun this again in case we need to lay out 6 cards at a time
  }, [deck, boardSize, mode]);

  useEffect(() => {
    if (!endOfGame) return;
    alert("You made it through the deck!");
  }, [endOfGame]);

  function getHint() {
    const presentGroups = findValidGroups(board(deck, boardSize), mode);
    if (presentGroups.length === 0) {
      alert("No sets here! Why don't you play on auto-set-deal mode?");
      return;
    }
    console.log(presentGroups[0]);
    setHint(presentGroups[0][0]);
  }

  function getAnswer() {
    const presentGroups = findValidGroups(board(deck, boardSize), mode);
    if (presentGroups.length === 0) {
      alert("No sets here! Why don't you play on auto-set-deal mode?");
      return;
    }
    console.log(presentGroups[0]);
    setAnswer(presentGroups[0]);
  }

  return (
    <GameStateContext.Provider
      value={{
        deck,
        boardSize,
        handleCardClick,
        currentGroup,
        invalidGroup,
        hint,
        getHint,
        answer,
        getAnswer,
        newGame,
        startOver,
        mode,
        setMode,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
