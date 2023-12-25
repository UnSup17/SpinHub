"use client";

import FormBuilder from "@/app/util/FormBuilder";
import { usePlayers } from "../hooks/usePlayers";
import { getPlayersFormElements } from "../models/players";

export default function InputData() {
  const {
    players,
    handleAddItem,
    handleInputChange,
    handleRemoveItem,
    handleSubmit,
  } = usePlayers();

  return (
    <div className="container mx-auto max-w-lg my-auto bg-white px-6 py-6 pb-4 relative neup">
      <div
        className="h-[90px] w-[70px] top-0 left-0 absolute"
        style={{
          backgroundImage: "url(/img/chrismast-corner.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div
        className="h-[100px] w-[130px] rotate-12 absolute -top-16 -right-12"
        style={{
          backgroundImage: "url(/img/chrismast-hat.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Secret Pal</h1>
          <p className="text-base text-slate-500">
            Enter the name and email of the players to play Secret Pal
          </p>
        </div>
        <div className="flex">
          <FormBuilder
            toSubmit={players}
            elements={getPlayersFormElements(players)}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            onChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
