import { range } from "lodash";
import { Card } from "../Card/Card";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const Board = ({}: {}) => {
  return (
    <div className="grid grid-rows-3 grid-cols-4 gap-x-3 gap-y-3 max-w-[50rem]">
      {range(12).map((i) => (
        <Card key={i} cardId={[getRandomInt(3), getRandomInt(3), getRandomInt(3), getRandomInt(3)]}></Card>
      ))}
    </div>
  );
};
