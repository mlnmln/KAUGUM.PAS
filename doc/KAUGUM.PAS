PROGRAM Kaugum;
USES
  Crt;

TYPE
  ZustandsmengeTyp =(Z0, Z50, Z100, Z150);
  AusgabemengeTyp = (Anichts, Aware, A50, A100, A150);
  EingabemengeTyp = (EWahl, EZurueck, E50, E100);

CONST
  Startzustand = Z0;

VAR
  Eingabe: EingabemengeTyp;
  Ausgabe:  AusgabemengeTyp;
  Zustand:  ZustandsmengeTyp;

PROCEDURE Eingabeprozedur (VAR Eingabe: EingabemengeTyp);
  VAR
    Taste : CHAR;
  BEGIN
    WRITE('---(W)ahl---(Z)ur�ck---(F)�nfzig Pf---(H)undert Pf---(E)nde--->');
    READLN(Taste);
    CASE UPCASE(Taste) OF
       'W' : Eingabe:=EWahl;
       'Z' : Eingabe:=EZurueck;
       'F' : Eingabe:=E50;
       'H' : Eingabe:=E100;
    ELSE
      Halt;
    END; (* Case *)
  END; (* Eingabeprozedur *)

PROCEDURE Ausgabeprozedur (Ausgabe: AusgabemengeTyp; Zustand: ZustandsmengeTyp);
  BEGIN
    CASE Zustand OF
      Z0   : WRITE('0,00DM  ');
      Z50  : WRITE('0,50DM  ');
      Z100 : WRITE('1,00DM  ');
      Z150 : WRITE('1,50DM  ');
    END; (* CASE *)
    CASE Ausgabe OF
      Anichts : WRITELN('-->Nichts');
      AWare   : WRITELN('-->Ware');
      A50     : WRITELN('-->0,50DM');
      A100    : WRITELN('-->1,00DM');
      A150    : WRITELN('-->1,50DM');
    END; (* CASE *)
  END; (* Ausgabeprozedur *)

PROCEDURE Uebergangsfunktion(    Eingabe: EingabemengeTyp;
                             VAR Ausgabe: AusgabemengeTyp;
                             VAR Zustand: ZustandsmengeTyp);
  BEGIN
    CASE Zustand OF
      Z0 : CASE Eingabe OF
             E50      : BEGIN
                          Ausgabe:=Anichts;
                          Zustand:=Z50;
                        END;
             E100     : BEGIN
                          Ausgabe:=Anichts;
                          Zustand:=Z150;
                        END;
             EWahl    : BEGIN
                          Ausgabe:=Anichts;
                          Zustand:=Z0;
                        END;
             EZurueck : BEGIN
                          Ausgabe:=Anichts;
                          Zustand:=Z0;
                        END;
             END; (* CASE *)
      Z50 : CASE Eingabe OF
             E50      : BEGIN
                          Ausgabe:=Anichts;
                          Zustand:=Z100;
                        END;
             E100     : BEGIN
                          Ausgabe:=Anichts;
                          Zustand:=Z150;
                        END;
             EWahl    : BEGIN
                          Ausgabe:=Anichts;
                          Zustand:=Z50;
                        END;
             EZurueck : BEGIN
                          Ausgabe:=A50;
                          Zustand:=Z0;
                        END;
             END; (* CASE *)
      Z100 : CASE Eingabe OF
             E50      : BEGIN
                          Ausgabe:=Anichts;
                          Zustand:=Z150;
                        END;
             E100     : BEGIN
                          Ausgabe:=A100;
                          Zustand:=Z100;
                        END;
             EWahl    : BEGIN
                          Ausgabe:=Anichts;
                          Zustand:=Z100;
                        END;
             EZurueck : BEGIN
                          Ausgabe:=A100;
                          Zustand:=Z0;
                        END;
             END; (* CASE *)
      Z150 : CASE Eingabe OF
             E50      : BEGIN
                          Ausgabe:=A50;
                          Zustand:=Z150;
                        END;
             E100     : BEGIN
                          Ausgabe:=A100;
                          Zustand:=Z150;
                        END;
             EWahl    : BEGIN
                          Ausgabe:=AWare;
                          Zustand:=Z0;
                        END;
             EZurueck : BEGIN
                          Ausgabe:=A150;
                          Zustand:=Z0;
                        END;
             END; (* CASE *)
      END; (* CASE *)
  END; (* Uebergangsfunktion *)

BEGIN (* Speicher *)
  CLRSCR;
  WRITELN('Kaugummiautomat');
  Zustand:=Startzustand;
  REPEAT
    Eingabeprozedur(Eingabe);
    Uebergangsfunktion(Eingabe, Ausgabe, Zustand);
    Ausgabeprozedur(Ausgabe, Zustand);
  UNTIL FALSE;
END.Kaugum
