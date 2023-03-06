import clsx from "clsx";
import { range } from "lodash";

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

export const Card = ({ cardId }: { cardId: number[] }) => {
  return (
    <div
      className={clsx("flex flex-col gap-5 justify-center", "border-slate-600 rounded-lg border-solid border-2 p-3")}
    >
      {range(cardId[2] + 1).map((i) => (
        <div
          className={clsx("w-[118px] h-[46px] bg-no-repeat bg-cover", CARD_IMAGES[cardId[0]][cardId[1]])}
          style={{
            filter: IMAGE_FILTERS[cardId[3]],
          }}
        ></div>
      ))}
    </div>
  );
};
