import { useContext } from "react";
import { Card } from "../Card/Card";
import { CardState, GameStateContext } from "../GameStateProvider/GameStateProvider";

export const Board = ({}: {}) => {
  const { deck } = useContext(GameStateContext);

  return (
    <div className="grid grid-rows-3 grid-cols-4 gap-x-3 gap-y-3 max-w-[50rem]">
      {deck.slice(0, 12).map((card: CardState, i: number) => (
        <Card key={card.id} card={card}></Card>
      ))}
    </div>
  );
};
