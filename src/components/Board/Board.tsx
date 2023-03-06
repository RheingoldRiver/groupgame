import { range } from "lodash";
import { Card } from "../Card/Card";

export const Board = ({}: {}) => {
  return (
    <div className="grid grid-rows-3 grid-cols-4 gap-x-3 gap-y-3 max-w-[50rem]">
      {range(12).map((i) => (
        <Card key={i}></Card>
      ))}
    </div>
  );
};
