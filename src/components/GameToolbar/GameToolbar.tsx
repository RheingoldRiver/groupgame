import * as Toolbar from "@radix-ui/react-toolbar";
import clsx from "clsx";
import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";

const styles = {
  button: clsx("cursor-pointer p-2 rounded", "shadow-sm shadow-zinc-900"),
};

export const GameToolbar = ({ ...rest }) => {
  const { getHint, getAnswer, newGame, startOver } = useContext(GameStateContext);
  return (
    <Toolbar.Root {...rest} className="space-x-3 mb-2 w-full flex justify-start">
      <Toolbar.Button
        className={styles.button}
        onClick={() => {
          newGame();
        }}
        aria-label="New game"
      >
        New Game
      </Toolbar.Button>
      <Toolbar.Button
        className={styles.button}
        onClick={() => {
          startOver();
        }}
        aria-label="Start over"
      >
        Start Over
      </Toolbar.Button>
      <Toolbar.Button
        className={clsx(styles.button, "!ml-auto")}
        onClick={() => {
          getAnswer();
        }}
        aria-label="Get answer"
      >
        Get Answer
      </Toolbar.Button>
      <Toolbar.Button
        className={clsx(styles.button)}
        onClick={() => {
          getHint();
        }}
        aria-label="Get hint"
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
