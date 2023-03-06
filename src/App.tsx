import { useState } from "react";
import AppStateProvider from "./components/AppStateProvider/AppStateProvider";
import { Footer } from "./components/Footer/Footer";
import { Game } from "./components/Game/Game";
import { GameStateProvider } from "./components/GameStateProvider/GameStateProvider";
import { Header } from "./components/Header/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppStateProvider>
      <GameStateProvider>
        <Header></Header>
        <Game></Game>
        <Footer></Footer>
      </GameStateProvider>
    </AppStateProvider>
  );
}

export default App;
