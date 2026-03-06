export interface Run {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  km: number;
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
    date: "2026-02-23",
    runs: [],
    hours: 0,
    content: `Silvester 2025, 23:57. Ich sitze mit einer Freundin auf dem Sofa. Wir reden über Kim Gotwald und Co. — Läuferbubble halt.

In dem Moment denke ich: wenn ich ein Ziel für 2026 habe, dann das Laufen lernen. In den letzten zwei Jahren bin ich zweimal beim Triathlon beim Laufen eingebrochen. Immer wenn ich die Wochenkilometer erhöht habe, meldet sich das linke äußere Knie. Tractus-iliotibialis-Syndrom — oder in Fachkreisen einfach: Läuferknie.

Das bedeutet: um überhaupt realistisch schmerzfrei zu laufen, muss erst Stabilisation her.

11.02.2026. Ich kriege ein Foto gesendet: "Erster Föhrer Backyard Ultra — jetzt anmelden."

Ein Backyard Ultra ist ein Last Man Standing Format. Jede Stunde wird eine Loop von 6.706 km absolviert, bis nur noch eine Person eine Runde alleine läuft.

Eigentlich macht es kein Sinn. Ich hab Probleme, überhaupt eine Loop zu laufen. Aber die Idee ist geboren.

Das Ziel: Läufer werden. Schmerzfrei und gesund. Und dann am 10.07.2026 zu sagen — GO ONE MORE.

Hier berichte ich jede Woche, wie es vorangeht.`,
    published: true,
  },
  {
    week: 1,
    date: "2026-03-02",
    runs: [
      { day: "Tue", km: 8 },
      { day: "Thu", km: 12 },
      { day: "Sat", km: 18 },
    ],
    hours: 4.5,
    content: `First week. The alarm went off at 5:30am on Saturday and I was already awake.

I've been thinking about this for a while. A backyard ultra — not a marathon, not a 100k with a finish line and a medal. A last-one-standing format. You run 4.167 miles every hour until everyone else stops. The winner runs one more loop after that.

There's something honest about that.

Started with a 3-hour trail run to shake out the legs. Nothing heroic. The point right now is to get the feet used to being on dirt again. Miles feel different on trails — slower, quieter, more real.

28 weeks. One yard. Let's see how many loops.`,
    published: true,
  },
  {
    week: 2,
    date: "2026-03-09",
    runs: [
      { day: "Mon", km: 10 },
      { day: "Wed", km: 14 },
      { day: "Fri", km: 8 },
      { day: "Sun", km: 22 },
    ],
    hours: 6.5,
    content: `Second week and the body is starting to remember what this feels like.

The long run on Sunday was the first time in a while where I genuinely lost track of time out there. Two hours in, legs moving on their own, just the trail and the breathing. That's the state I need to be able to hold for 12, 15, 20 hours come race day.

Still not thinking about race day. Just thinking about next Saturday.`,
    published: true,
  },
  ...Array.from({ length: 26 }, (_, i) => ({
    week: i + 3,
    date: "",
    runs: [],
    hours: 0,
    content: "",
    published: false,
  })),
];
