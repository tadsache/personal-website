export interface Run {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  km: number;
}

export interface Post {
  week: number;
  date: string;
  runs: Run[];
  content: string;
  published: boolean;
}

export const posts: Post[] = [
  {
    week: 0,
    date: "2026-02-23",
    runs: [],
    content: `A backyard ultra is not a race with a finish line.

The format is simple: run a 4.167-mile loop every hour, on the hour, for as long as you can. The last person standing wins — but only after completing one more loop than everyone else. There is no set distance. No medal waiting at a predetermined point. You run until you can't, or until everyone else has stopped.

I'm giving myself 28 weeks to get ready. Not ready to win — ready to last. Ready to keep moving through the night when the math stops making sense and the legs want to quit. Ready to find out what's on the other side of the obvious stopping points.

This is a training log. One entry per week. Raw and honest. The km, the feeling, the doubt, and occasionally the good days.

The yard is waiting.`,
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
    content: `Second week and the body is starting to remember what this feels like.

The long run on Sunday was the first time in a while where I genuinely lost track of time out there. Two hours in, legs moving on their own, just the trail and the breathing. That's the state I need to be able to hold for 12, 15, 20 hours come race day.

Still not thinking about race day. Just thinking about next Saturday.`,
    published: true,
  },
  ...Array.from({ length: 26 }, (_, i) => ({
    week: i + 3,
    date: "",
    runs: [],
    content: "",
    published: false,
  })),
];
