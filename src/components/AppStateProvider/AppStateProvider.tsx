import { createContext, ReactNode } from "react";

export const AppStateContext = createContext({});

export default function AppStateProvider({ children }: { children: ReactNode }) {
  return <AppStateContext.Provider value={{}}>{children}</AppStateContext.Provider>;
}
