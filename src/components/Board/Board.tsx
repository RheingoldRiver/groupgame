import { useContext } from "react";
import { Card } from "../Card/Card";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { CardType } from "../Card/cardTypes";
import clsx from "clsx";
import { AppStateContext, Layout, Orientation } from "../AppStateProvider/AppStateProvider";

export const Board = ({ ...rest }) => {
  const { deck, boardSize } = useContext(GameStateContext);
  const { orientation, layout } = useContext(AppStateContext);
  return (
    <div {...rest} className={clsx("block h-min", orientation === Orientation.Horizontal && "rotate-90")}>
      <div
        className={clsx(
          "grid gap-x-3 gap-y-3 ",
          layout === Layout.Square ? "grid-rows-3 grid-flow-col" : "grid-cols-3 grid-flow-row"
        )}
      >
        {deck.slice(0, boardSize).map((card: CardType, i: number) => (
          <Card key={card.id} card={card}></Card>
        ))}
      </div>
    </div>
  );
};
