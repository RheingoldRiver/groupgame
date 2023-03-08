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
  Set = 0,
  Planet = 1,
}

export enum Orientation {
  Vertical = 0,
  Horizontal = 1,
}

export enum HandleNoGroups {
  Auto = 0,
  Manual = 1,
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
  getHint: Function;
  hint: CardType | undefined;
}

export const DEFAULT_GAME_STATE: GameState = {
  deck: [],
  boardSize: MODE_SETTINGS[Mode.Set].boardSize,
  handleCardClick: () => {},
  currentGroup: [],
  invalidGroup: [],
  getHint: () => {},
  hint: undefined,
};
