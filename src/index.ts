#!/usr/bin/env node
const readline = require("readline");

type ZustandsmengeTyp = "Z0" | "Z50" | "Z100" | "Z150";
type AusgabemengeTyp = "Anichts" | "Aware" | "A50" | "A100" | "A150";
type EingabemengeTyp = "EWahl" | "EZurueck" | "E50" | "E100";

function Eingabeprozedur(Taste: string) {
  let Eingabe: EingabemengeTyp;

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
  }

  return Eingabe;
}

function Ausgabeprozedur(Ausgabe: AusgabemengeTyp, Zustand: ZustandsmengeTyp) {
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
  }
}

function Uebergangsfunktion(
  Eingabe: EingabemengeTyp,
  Ausgabe: AusgabemengeTyp,
  Zustand: ZustandsmengeTyp
) {
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
  }

  return { Ausgabe, Zustand };
}

function main() {
  const Startzustand = "Z0";

  let Eingabe: EingabemengeTyp;
  let Ausgabe: AusgabemengeTyp;
  let Zustand: ZustandsmengeTyp;

  Zustand = Startzustand;

  console.log("Kaugummiautomat\n");
  console.log(
    "---(W)ahl---(Z)urück---(F)ünfzig Pf---(H)undert Pf---(E)nde--->"
  );

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on("keypress", (Taste: string) => {
    const result = Uebergangsfunktion(Eingabeprozedur(Taste), Ausgabe, Zustand);
    Ausgabeprozedur(result.Ausgabe, result.Zustand);
  });
}

main();
