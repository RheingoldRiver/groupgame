import * as Toolbar from "@radix-ui/react-toolbar";
import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";

export const GameToolbar = () => {
  const { getHint } = useContext(GameStateContext);
  console.log(getHint);
  return (
    <Toolbar.Root>
      <Toolbar.Button
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
