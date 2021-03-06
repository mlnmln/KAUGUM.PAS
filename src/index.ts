#!/usr/bin/env node

const readline = require("readline");
const tty = require("tty");

type ZustandsmengeTyp = "Z0" | "Z50" | "Z100" | "Z150";
type AusgabemengeTyp = "Anichts" | "Aware" | "A50" | "A100" | "A150";
type EingabemengeTyp = "EWahl" | "EZurueck" | "E50" | "E100";

const Startzustand = "Z0";

let Eingabe: EingabemengeTyp;
let Ausgabe: AusgabemengeTyp;
let Zustand: ZustandsmengeTyp;

async function Eingabeprozedur() {
  console.log(
    "---(W)ahl---(Z)urück---(F)ünfzig Pf---(H)undert Pf---(E)nde--->"
  );
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin instanceof tty.ReadStream) {
    process.stdin.setRawMode(true);
  }

  return new Promise<void>(resolve =>
    process.stdin.once("keypress", (Taste: string) => {
      if (process.stdin instanceof tty.ReadStream) {
        process.stdin.setRawMode(false);
      }

      switch (Taste.toUpperCase()) {
        case "W":
          Eingabe = "EWahl";
          break;
        case "Z":
          Eingabe = "EZurueck";
          break;
        case "F":
          Eingabe = "E50";
          break;
        case "H":
          Eingabe = "E100";
          break;
        default:
          process.exit();
          break;
      }

      resolve();
    })
  );
}

function Ausgabeprozedur() {
  switch (Zustand) {
    case "Z0":
      console.log("0,00DM  ");
      break;
    case "Z50":
      console.log("0,50DM  ");
      break;
    case "Z100":
      console.log("1,00DM  ");
      break;
    case "Z150":
      console.log("1,50DM  ");
      break;
    default:
      break;
  }

  switch (Ausgabe) {
    case "Anichts":
      console.log("-->Nichts");
      break;
    case "Aware":
      console.log("-->Ware");
      break;
    case "A50":
      console.log("-->0,50DM");
      break;
    case "A100":
      console.log("-->1,00DM");
      break;
    case "A150":
      console.log("-->1,50DM");
      break;
    default:
      break;
  }
}

function Uebergangsfunktion() {
  switch (Zustand) {
    case "Z0":
      switch (Eingabe) {
        case "E50":
          Ausgabe = "Anichts";
          Zustand = "Z50";
          break;
        case "E100":
          Ausgabe = "Anichts";
          Zustand = "Z100";
          break;
        case "EWahl":
          Ausgabe = "Anichts";
          Zustand = "Z0";
          break;
        case "EZurueck":
          Ausgabe = "Anichts";
          Zustand = "Z0";
          break;
      }
      break;
    case "Z50":
      switch (Eingabe) {
        case "E50":
          Ausgabe = "Anichts";
          Zustand = "Z100";
          break;
        case "E100":
          Ausgabe = "Anichts";
          Zustand = "Z150";
          break;
        case "EWahl":
          Ausgabe = "Anichts";
          Zustand = "Z50";
          break;
        case "EZurueck":
          Ausgabe = "A50";
          Zustand = "Z0";
          break;
      }
      break;
    case "Z100":
      switch (Eingabe) {
        case "E50":
          Ausgabe = "Anichts";
          Zustand = "Z150";
          break;
        case "E100":
          Ausgabe = "A100";
          Zustand = "Z100";
          break;
        case "EWahl":
          Ausgabe = "Anichts";
          Zustand = "Z100";
          break;
        case "EZurueck":
          Ausgabe = "A100";
          Zustand = "Z0";
          break;
      }
      break;
    case "Z150":
      switch (Eingabe) {
        case "E50":
          Ausgabe = "A50";
          Zustand = "Z150";
          break;
        case "E100":
          Ausgabe = "A100";
          Zustand = "Z150";
          break;
        case "EWahl":
          Ausgabe = "Aware";
          Zustand = "Z0";
          break;
        case "EZurueck":
          Ausgabe = "A150";
          Zustand = "Z0";
          break;
      }
      break;
  }
}

async function Speicher() {
  console.log("Kaugummiautomat\n");
  Zustand = Startzustand;

  do {
    await Eingabeprozedur();
    Uebergangsfunktion();
    Ausgabeprozedur();
  } while (true);
}

Speicher();
