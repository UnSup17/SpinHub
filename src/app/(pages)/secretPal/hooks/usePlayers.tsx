import { useState } from "react";
import {
  modifyObject,
  addObject,
  retireObject,
} from "@/app/util/RecursiveObjects";
import { PlayersModel, getPlayerInitialValues } from "../models/players";
import { PropsPath } from "@/app/models/propsPath";
import { shuffle } from "../services/shuffle";

export const usePlayers = () => {
  const [players, setPlayers] = useState(getPlayerInitialValues());

  const handleInputChange = (propsPath: PropsPath, value: any) => {
    setPlayers(modifyObject(propsPath, value, players));
  };

  const handleAddItem = (propsPath: PropsPath, newItem: object) => {
    setPlayers(addObject(propsPath, newItem, players));
  };

  const handleRemoveItem = (propsPath: PropsPath) => {
    setPlayers(retireObject(propsPath, players) as PlayersModel);
  };

  const handleSubmit = async () => {
    const result = await shuffle(players);
    console.log(result);
  };

  return {
    players,
    handleInputChange,
    handleAddItem,
    handleRemoveItem,
    handleSubmit,
  };
};
