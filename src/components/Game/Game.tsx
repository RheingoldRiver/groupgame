import { useContext } from "react";
import { AppToolbar } from "../AppToolbar/AppToolbar";
import { Board } from "../Board/Board";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { GameToolbar } from "../GameToolbar/GameToolbar";

export const Game = ({}: {}) => {
  const { mode } = useContext(GameStateContext);
  return (
    <div
      className="grid justify-center py-4 w-full grid-cols-[auto_max-content_auto]"
      style={{
        gridTemplateAreas: `". modeText ."". gameToolbar ." ". board ." ". appToolbar ."`,
      }}
    >
      <div className="text-center" style={{ gridArea: "modeText" }}>
        Currently playing {mode}
      </div>
      <GameToolbar style={{ gridArea: "gameToolbar" }} />
      <Board style={{ gridArea: "board" }} />
      <AppToolbar style={{ gridArea: "appToolbar" }} />
    </div>
  );
};
