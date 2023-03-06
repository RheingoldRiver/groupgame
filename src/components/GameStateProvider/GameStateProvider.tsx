import { createContext, ReactNode } from "react";

export const GameStateContext = createContext({});

export function GameStateProvider({ children }: { children: ReactNode }) {
  return <GameStateContext.Provider value={{}}>{children}</GameStateContext.Provider>;
}
