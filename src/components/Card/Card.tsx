import clsx from "clsx";
import { range } from "lodash";
import { useContext } from "react";
import { AppStateContext, Orientation } from "../AppStateProvider/AppStateProvider";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { CardType } from "./cardTypes";

const CARD_IMAGES = [
  ["bg-[url(assets/card_00.png)]", "bg-[url(assets/card_01.png)]", "bg-[url(assets/card_02.png)]"],
  ["bg-[url(assets/card_10.png)]", "bg-[url(assets/card_11.png)]", "bg-[url(assets/card_12.png)]"],
  ["bg-[url(assets/card_20.png)]", "bg-[url(assets/card_21.png)]", "bg-[url(assets/card_22.png)]"],
];

const CARD_IMAGES_BEFORE = [
  ["before:bg-[url(assets/card_00.png)]", "before:bg-[url(assets/card_01.png)]", "before:bg-[url(assets/card_02.png)]"],
  ["before:bg-[url(assets/card_10.png)]", "before:bg-[url(assets/card_11.png)]", "before:bg-[url(assets/card_12.png)]"],
  ["before:bg-[url(assets/card_20.png)]", "before:bg-[url(assets/card_21.png)]", "before:bg-[url(assets/card_22.png)]"],
];

const IMAGE_FILTERS = [
  "invert(19%) sepia(78%) saturate(3328%) hue-rotate(351deg) brightness(86%) contrast(133%)", // red
  "invert(8%) sepia(89%) saturate(5729%) hue-rotate(295deg) brightness(93%) contrast(108%)", // purple
  "invert(21%) sepia(85%) saturate(6983%) hue-rotate(129deg) brightness(97%) contrast(103%)", // green
];

export const Card = ({ card }: { card: CardType }) => {
  const { handleCardClick, currentGroup, invalidGroup, hint, answer } = useContext(GameStateContext);
  const { orientation } = useContext(AppStateContext);

  const vector = card.vector;
  return (
    <div
      data-id={card.id}
      className={clsx(
        "flex gap-5 justify-center cursor-pointer",
        "border-slate-600 rounded-lg border-solid border-2 m-[2px] p-3",
        currentGroup.includes(card) && "!border-4 !border-green-500 !m-0",
        invalidGroup.map((invalidCard) => invalidCard.card).includes(card) && "!border-4 !border-red-500 !m-0",
        (hint?.id === card.id || answer.includes(card)) && "!border-green-500 border-4 !m-0 border-dashed",
        orientation === Orientation.Vertical ? "flex-col h-52" : "flex-row w-52 h-32 items-center"
      )}
      onClick={() => {
        handleCardClick(card);
      }}
    >
      {range(vector[2] + 1).map((i) => (
        <img
          key={i}
          src={`card_${vector[0]}${vector[1]}.png`}
          className={clsx("w-[118px] h-[46px]", orientation === Orientation.Horizontal ? "rotate-90 mx-[-40px]" : "")}
          style={{
            // transform: orientation === Orientation.Horizontal ? "rotate(90deg) translate(25%)" : "",
            filter: IMAGE_FILTERS[vector[3]], // color (rbg)
          }}
        ></img>
      ))}
    </div>
  );
};
