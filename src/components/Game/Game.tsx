import { Board } from "../Board/Board";
import { GameToolbar } from "../GameControls/GameControls";

export const Game = ({}: {}) => {
  return (
    <div className="grid justify-center py-4">
      <GameToolbar />
      <Board></Board>
    </div>
  );
};
