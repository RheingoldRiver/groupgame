import { CardType } from "../Card/cardTypes";

interface GameState {
  deck: CardType[];
  handleCardClick: Function;
  currentGroup: CardType[];
  invalidGroup: InvalidCard[];
}

export const DEFAULT_GAME_STATE: GameState = {
  deck: [],
  handleCardClick: () => {},
  currentGroup: [],
  invalidGroup: [],
};

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

export const MODE_SETTINGS = {
  [Mode.Set]: {
    groupSize: 3,
    boardSize: 12,
  },
  [Mode.Planet]: {
    groupSize: 4,
    boardSize: 12,
  },
};
