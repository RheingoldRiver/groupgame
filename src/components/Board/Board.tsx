import { useContext } from "react";
import { Card } from "../Card/Card";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { CardType } from "../Card/cardTypes";

export const Board = ({}: {}) => {
  const { deck, boardSize } = useContext(GameStateContext);

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-x-3 gap-y-3 max-w-[50rem]">
      {deck.slice(0, boardSize).map((card: CardType, i: number) => (
        <Card key={card.id} card={card}></Card>
      ))}
    </div>
  );
};
