import * as Toolbar from "@radix-ui/react-toolbar";
import clsx from "clsx";
import { useContext } from "react";
import { AppStateContext, Layout, Orientation } from "../AppStateProvider/AppStateProvider";
import { Mode } from "../GameStateProvider/gameStateConstants";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { ToolbarRadioDropdown } from "../ToolbarComponents/ToolbarDropdown";

const styles = {
  button: clsx("cursor-pointer p-2 rounded", "shadow-sm shadow-zinc-900"),
  item: clsx(
    "flex items-center justify-end gap-px w-full cursor-pointer",
    "bg-slate-100 p-1 shadow-md shadow-slate-500"
  ),
  indicator: clsx(""),
};

export const AppToolbar = ({ ...rest }) => {
  const { mode, setMode } = useContext(GameStateContext);
  const { orientation, setOrientation, layout, setLayout } = useContext(AppStateContext);
  return (
    <Toolbar.Root {...rest} className="space-x-3 mb-2 w-96 flex rounded-md">
      <ToolbarRadioDropdown enumType={Mode} enumCurrent={mode} setter={setMode}>
        <button className={styles.button} aria-label="Change game mode">
          {mode}...
        </button>
      </ToolbarRadioDropdown>
      <ToolbarRadioDropdown enumType={Orientation} enumCurrent={orientation} setter={setOrientation}>
        <button className={styles.button} aria-label="Change card orientation">
          {orientation}...
        </button>
      </ToolbarRadioDropdown>
      <ToolbarRadioDropdown enumType={Layout} enumCurrent={layout} setter={setLayout}>
        <button className={styles.button} aria-label="Change board layout">
          {layout}...
        </button>
      </ToolbarRadioDropdown>

      {/* <Toolbar.Separator />
      <Toolbar.Link />
      <Toolbar.ToggleGroup>
        <Toolbar.ToggleItem />
      </Toolbar.ToggleGroup> */}
    </Toolbar.Root>
  );
};
