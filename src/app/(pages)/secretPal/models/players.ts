import { FormElement } from "@/app/models/FormElement"

export type PlayersModel = {
  day: string,
  place: string,
  time: string,
  players: {
    name: string,
    email: string,
    color: string,
  }[]
}

function getPlayerInitialValues() {
  return {
    day: "",
    place: "",
    time: "",
    players: [
      {
        name: "",
        email: "",
        color: ""
      },
      {
        name: "",
        email: "",
        color: ""
      },
    ]
  } as PlayersModel
}

function getPlayersFormElements(players: PlayersModel) {
  function getPlayerDataModelRow(players: PlayersModel) {
    return players.players.map((player, index) => {
      return [
        {
          type: "text",
          placeholder: "Name",
          typeText: "text",
          name: "players." + index + ".name",
          value: player.name,
          className: "w-1/4 grow border px-2 py-1 border-slate-100 rounded shadow-inner"
        },
        {
          type: "text",
          placeholder: "Email",
          typeText: "email",
          name: "players." + index + ".email",
          value: player.email,
          className: "w-1/4 grow grow border px-2 py-1 border-slate-100 rounded shadow-inner"
        },
        {
          type: "color",
          name: "players." + index + ".color",
          value: player.color,
          className: "w-6 rounded"
        }
      ] as FormElement[]
    })
  }
  return [
    {
      placeholder: "Dia",
      type: "datePicker",
      typeText: "text",
      name: "day",
      value: players.day,
      className: "w-0 grow px-2 py-1 border-slate-100 rounded shadow-inner my-4"
    }, {
      placeholder: "Hora",
      type: "time",
      typeText: "text",
      name: "time",
      value: players.time,
      className: "w-0 grow px-2 py-1 border-slate-100 rounded shadow-inner my-4"
    }, {
      placeholder: "Lugar",
      type: "text",
      typeText: "text",
      name: "place",
      value: players.place,
      className: "w-0 grow px-2 py-1 border-slate-100 rounded shadow-inner my-4"
    },
    {
      type: "dynamicList",
      subForm: getPlayerDataModelRow(players),
      name: "players",
      value: players.players,
      min: 2,
      object: {
        name: "",
        email: "",
      },
      className: "mx-auto"
    }
  ] as FormElement[];
}

export { getPlayerInitialValues, getPlayersFormElements }

