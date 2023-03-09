import * as Toolbar from "@radix-ui/react-toolbar";
import clsx from "clsx";
import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";

const styles = {
  button: clsx("cursor-pointer p-2 rounded", "shadow-sm shadow-zinc-900"),
};

export const GameToolbar = ({ ...rest }) => {
  const { getHint, newGame, startOver } = useContext(GameStateContext);
  return (
    <Toolbar.Root {...rest} className="space-x-3 mb-2 w-full flex justify-start">
      <Toolbar.Button
        className={styles.button}
        onClick={() => {
          newGame();
        }}
      >
        New Game
      </Toolbar.Button>
      <Toolbar.Button
        className={styles.button}
        onClick={() => {
          startOver();
        }}
      >
        Start Over
      </Toolbar.Button>
      <Toolbar.Button
        className={clsx(styles.button, "!ml-auto")}
        onClick={() => {
          getHint();
        }}
      >
        Get Hint
      </Toolbar.Button>
      {/* <Toolbar.Separator />
      <Toolbar.Link />
      <Toolbar.ToggleGroup>
        <Toolbar.ToggleItem />
      </Toolbar.ToggleGroup> */}
    </Toolbar.Root>
  );
};
