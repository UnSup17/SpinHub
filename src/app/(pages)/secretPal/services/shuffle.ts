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
  const mails: { subject: string; toEmail: string; optText: string; }[] = []
  shuffleList.forEach(async (player, index) => {
    mails.push({
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
      })
    });
  });
  const response = await sendMail(mails)

  return response;
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
    const response = await sendMails(players, shuffledPlayers);
    console.log("All ok:", response)
    return response
  } catch (error) {
    console.log("Error:", error)
    return error;
  }
}

export { shuffle }