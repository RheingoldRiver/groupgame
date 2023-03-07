import clsx from "clsx";
import { range } from "lodash";
import { useContext } from "react";
import { CardState, GameStateContext } from "../GameStateProvider/GameStateProvider";

const CARD_IMAGES = [
  ["bg-[url(assets/card_00.png)]", "bg-[url(assets/card_01.png)]", "bg-[url(assets/card_02.png)]"],
  ["bg-[url(assets/card_10.png)]", "bg-[url(assets/card_11.png)]", "bg-[url(assets/card_12.png)]"],
  ["bg-[url(assets/card_20.png)]", "bg-[url(assets/card_21.png)]", "bg-[url(assets/card_22.png)]"],
];

const IMAGE_FILTERS = [
  "invert(14%) sepia(94%) saturate(2564%) hue-rotate(353deg) brightness(93%) contrast(87%)",
  "invert(29%) sepia(8%) saturate(5799%) hue-rotate(118deg) brightness(92%) contrast(95%)",
  "invert(17%) sepia(76%) saturate(2985%) hue-rotate(224deg) brightness(94%) contrast(95%)",
];

export const Card = ({ card }: { card: CardState }) => {
  const { handleCardClick, currentGroup, invalidGroup } = useContext(GameStateContext);
  const vector = card.vector;
  return (
    <div
      className={clsx(
        "flex flex-col gap-5 justify-center",
        "border-slate-600 rounded-lg border-solid border-2 p-3",
        currentGroup.includes(card) && "border-5 border-green-500",
        invalidGroup.includes(card) && "border-5 border-red-500"
      )}
      onClick={() => {
        handleCardClick(card.id);
      }}
    >
      {range(vector[2] + 1).map((i) => (
        <div
          key={i}
          className={clsx("w-[118px] h-[46px] bg-no-repeat bg-cover", CARD_IMAGES[vector[0]][vector[1]])}
          style={{
            filter: IMAGE_FILTERS[vector[3]],
          }}
        ></div>
      ))}
    </div>
  );
};
