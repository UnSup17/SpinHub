"use server";

import { sendMail } from "@/app/services/nodemailer";
import NewAssignationMail from "../models/assignationMail";

type PlayerList = {
  name: string,
  email: string,
  color: string,
}

type PlayerModel = {
  day: string,
  place: string,
  time: string,
  players: PlayerList[]
}

const shuffleArray = (array: PlayerList[]) => {
  const shuffled = array.slice();
  let currentIndex = shuffled.length;
  let temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }
  return shuffled;
};

const sendMails = async (players: PlayerModel, shuffleList: PlayerList[]) => {
  shuffleList.forEach(async (player, index) => {
    await sendMail({
      toEmail: players.players[index].email,
      subject: "Secret Pal",
      optText: NewAssignationMail({
        title: "See your secret Pal",
        day: players.day,
        place: players.place,
        time: players.time,
        name: players.players[index].name,
        pal: player.name,
        color: players.players[index].color,
      }),
    });
  });

}

async function shuffle(players: PlayerModel) {
  const copy = [...players.players];
  let playableList = false;
  let shuffledPlayers = [];
  do {
    shuffledPlayers = shuffleArray(copy);
    playableList = shuffledPlayers.every((player, index) => player.email != players.players[index].email);
  } while (!playableList);

  try {
    await sendMails(players, shuffledPlayers);
    return true
  } catch (error) {
    return error;
  }
}

export { shuffle }