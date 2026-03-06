export interface Run {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  km: number;
  pace?: string;
  hr?: number;
}

export interface Post {
  week: number;
  date: string;
  runs: Run[];
  hours: number;
  content: string;
  published: boolean;
}

export const posts: Post[] = [
  {
    week: 0,
    date: "2026-02-11",
    runs: [],
    hours: 0,
    content: `Silvester 2025, 23:57. Ich sitze mit einer Freundin auf dem Sofa. Wir reden über Kim Gotwald und Co. Läuferbubble halt.

In dem Moment denke ich: wenn ich ein Ziel für 2026 habe, dann das Laufen lernen. In den letzten zwei Jahren bin ich zweimal beim Triathlon beim Laufen eingebrochen. Immer wenn ich die Wochenkilometer erhöht habe, meldet sich das linke äußere Knie. Tractus-iliotibialis-Syndrom, oder in Fachkreisen einfach: Läuferknie.

Das bedeutet: um überhaupt realistisch schmerzfrei zu laufen, muss erst Stabilisation her.

11.02.2026. Ich kriege ein Foto gesendet: "Erster Föhrer Backyard Ultra. Jetzt anmelden."

Ein Backyard Ultra ist ein Last Man Standing Format. Jede Stunde wird eine Loop von 6.706 km absolviert, bis nur noch eine Person eine Runde alleine läuft.

Eigentlich macht es kein Sinn. Ich hab Probleme, überhaupt eine Loop zu laufen. Aber die Idee ist geboren.

Das Ziel: Läufer werden. Schmerzfrei und gesund. Und dann am 10.07.2026 zu sagen: GO ONE MORE.

Hier berichte ich jede Woche, wie es vorangeht.`,
    published: true,
  },
  {
    week: 1,
    date: "2026-02-12",
    runs: [
      { day: "Thu", km: 5, pace: "7:32", hr: 173 },
      { day: "Sat", km: 5, pace: "7:34", hr: 172 },
    ],
    hours: 1.3,
    content: `Donnerstag, 12.02. Ich schreibe die Nachricht. Ich bin dabei. Erster Föhrer Backyard Ultra. Kein zurück mehr.

Ich weiß, ich muss langsam starten. Die Herzfrequenz muss runter, die Beine sich wieder an die Belastung gewöhnen. ChatGPT und ich machen einen Plan. Ziel: 8 Loops. 53,6 km.

Noch am selben Tag, erster Lauf mit dem Ziel, einen Backyard zu laufen. 5 km bei -1 Grad. Mein Herz ist noch nicht begeistert. Der Plan, 7:30 min/km als entspannten Lauf anzugehen, klappt mittelmäßig. 173 bpm. Das ist niemals Zone 2.

Am Samstag genau dasselbe nochmal. 5 km, 7:34 min/km, ähnliche Herzfrequenz.

Die gute Nachricht: das Knie macht mit.`,
    published: true,
  },
  ...Array.from({ length: 19 }, (_, i) => ({
    week: i + 2,
    date: "",
    runs: [],
    hours: 0,
    content: "",
    published: false,
  })),
];
