import { useContext } from "react";
import { Card } from "../Card/Card";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { CardType } from "../Card/cardTypes";
import clsx from "clsx";
import { AppStateContext, Layout, Orientation } from "../AppStateProvider/AppStateProvider";

export const Board = ({ ...rest }) => {
  const { deck, boardSize } = useContext(GameStateContext);
  const { layout, orientation } = useContext(AppStateContext);

  const GRID_STYLES = {
    [Layout.Square]: {
      [Orientation.Vertical]: "grid-rows-3 grid-flow-col",
      [Orientation.Horizontal]: "grid-cols-3 grid-flow-row",
    },
    [Layout.Rectangle]: {
      [Orientation.Vertical]: "grid-cols-3 grid-flow-row",
      [Orientation.Horizontal]: "grid-rows-3 grid-flow-col",
    },
  };

  return (
    <div {...rest} className={clsx("block h-min")}>
      <div className={clsx("grid gap-x-3 gap-y-3 ", GRID_STYLES[layout][orientation])}>
        {deck.slice(0, boardSize).map((card: CardType, i: number) => (
          <Card key={card.id} card={card}></Card>
        ))}
      </div>
    </div>
  );
};
