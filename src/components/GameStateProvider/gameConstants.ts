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

export const CARDS_PER_GROUP = {
    set: 3,
    planet: 4,
}

export const DEFAULT_MODE = "set";