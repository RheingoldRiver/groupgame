import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export enum Orientation {
  Vertical = "Vertical",
  Horizontal = "Horizontal",
}

export enum Layout {
  Square = "Square",
  Rectangle = "Rectangle",
}

interface AppState {
  orientation: Orientation;
  setOrientation: Dispatch<SetStateAction<Orientation>>;
  layout: Layout;
  setLayout: Dispatch<SetStateAction<Layout>>;
}

export const DEFAULT_APP_STATE: AppState = {
  orientation: Orientation.Vertical,
  setOrientation: () => {},
  layout: Layout.Square,
  setLayout: () => {},
};

export const AppStateContext = createContext(DEFAULT_APP_STATE);
export default function AppStateProvider({ children }: { children: ReactNode }) {
  const [orientation, setOrientation] = useState<Orientation>(Orientation.Vertical);
  const [layout, setLayout] = useState<Layout>(Layout.Square);
  return (
    <AppStateContext.Provider value={{ orientation, setOrientation, layout, setLayout }}>
      {children}
    </AppStateContext.Provider>
  );
}
