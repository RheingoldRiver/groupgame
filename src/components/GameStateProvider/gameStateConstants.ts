import { Dispatch, SetStateAction } from "react";
import { CardType } from "../Card/cardTypes";

export const DEFAULT_DECK = [
  { id: crypto.randomUUID(), vector: [0] },
  { id: crypto.randomUUID(), vector: [1] },
  { id: crypto.randomUUID(), vector: [2] },
];

export interface InvalidCard {
  card: CardType;
  destroy: Function;
}

export enum Mode {
  Set = "Set",
  Planet = "Planet",
}

export enum HandleNoGroups {
  Auto = "Auto",
  Manual = "Manual",
}

export const MODE_SETTINGS = {
  [Mode.Set]: {
    groupSize: 3,
    boardSize: 12,
    incrementSize: 3,
  },
  [Mode.Planet]: {
    groupSize: 4,
    boardSize: 12,
    incrementSize: 3,
  },
};

interface GameState {
  deck: CardType[];
  boardSize: number;
  handleCardClick: Function;
  currentGroup: CardType[];
  invalidGroup: InvalidCard[];
  hint: CardType | undefined;
  getHint: Function;
  answer: CardType[];
  getAnswer: Function;
  newGame: Function;
  startOver: Function;
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
}

export const DEFAULT_GAME_STATE: GameState = {
  deck: [],
  boardSize: MODE_SETTINGS[Mode.Set].boardSize,
  handleCardClick: () => {},
  currentGroup: [],
  invalidGroup: [],
  hint: undefined,
  getHint: () => {},
  answer: [],
  getAnswer: () => {},
  newGame: () => {},
  startOver: () => {},
  mode: Mode.Set,
  setMode: () => {},
};
