import { AppToolbar } from "../AppToolbar/AppToolbar";
import { Board } from "../Board/Board";
import { GameToolbar } from "../GameToolbar/GameToolbar";

export const Game = ({}: {}) => {
  return (
    <div
      className="grid justify-center py-4 w-full grid-cols-[auto_min-content_auto]"
      style={{
        gridTemplateAreas: `". gameToolbar ." ". board ." ". appToolbar ."`,
      }}
    >
      <GameToolbar style={{ gridArea: "gameToolbar" }} />
      <Board style={{ gridArea: "board" }} />
      <AppToolbar style={{ gridArea: "appToolbar" }} />
    </div>
  );
};
