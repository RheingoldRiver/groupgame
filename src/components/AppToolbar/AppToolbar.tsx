import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Toolbar from "@radix-ui/react-toolbar";
import clsx from "clsx";
import { useContext } from "react";
import { DotFilledIcon } from "../../assets/DotFilledIcon";
import { Mode } from "../GameStateProvider/gameStateConstants";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";

const styles = {
  button: clsx("cursor-pointer p-2 rounded", "shadow-sm shadow-zinc-900"),
  item: clsx(
    "flex items-center justify-end gap-px w-full cursor-pointer",
    "bg-slate-100 p-1 shadow-md shadow-slate-500"
  ),
  indicator: clsx(""),
};

export const AppToolbar = ({ ...rest }) => {
  const { mode, setMode, orientation, setOrientation } = useContext(GameStateContext);
  return (
    <Toolbar.Root {...rest} className="space-x-3 mb-2 w-96 flex rounded-md">
      <DropdownMenu.Root defaultOpen={false}>
        <DropdownMenu.Trigger asChild>
          <button className={styles.button} aria-label="Change game mode">
            Game Mode
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="w-24 mt-px">
            <DropdownMenu.RadioGroup
              value={mode.toString()}
              onValueChange={(s) => {
                setMode(Mode[s as keyof typeof Mode]);
              }}
            >
              <DropdownMenu.RadioItem value={Mode.Set.toString()} className={styles.item}>
                <DropdownMenu.ItemIndicator className={mode !== Mode.Set ? "hidden" : ""}>
                  <DotFilledIcon />
                </DropdownMenu.ItemIndicator>
                {Mode.Set.toString()}
              </DropdownMenu.RadioItem>
              {/* Break between items */}
              <DropdownMenu.RadioItem className={styles.item} value={Mode.Planet.toString()}>
                <DropdownMenu.ItemIndicator className={mode !== Mode.Planet ? "hidden" : ""}>
                  <DotFilledIcon />
                </DropdownMenu.ItemIndicator>
                {Mode.Planet.toString()}
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
            {/*
            
            Break between groups
            
            */}
            {/* 
              <DropdownMenu.Label />
              <DropdownMenu.Item className={styles.item}></DropdownMenu.Item>
              <DropdownMenu.Item className={styles.item}>{Mode.Planet.toString()}</DropdownMenu.Item> */}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* <Toolbar.Separator />
      <Toolbar.Link />
      <Toolbar.ToggleGroup>
        <Toolbar.ToggleItem />
      </Toolbar.ToggleGroup> */}
    </Toolbar.Root>
  );
};
