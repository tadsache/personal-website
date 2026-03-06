export interface Post {
  week: number;
  title: string;
  date: string;
  km: number;
  feeling: string;
  content: string;
  published: boolean;
}

const WEEK_1_CONTENT = `First week. The alarm went off at 5:30am on Saturday and I was already awake.

I've been thinking about this for a while. A backyard ultra — not a marathon, not a 100k with a finish line and a medal. A last-one-standing format. You run 4.167 miles every hour until everyone else stops. The winner runs one more loop after that.

There's something honest about that.

Started with a 3-hour trail run to shake out the legs. Nothing heroic. The point right now is to get the feet used to being on dirt again. Miles feel different on trails — slower, quieter, more real.

28 weeks. One yard. Let's see how many loops.`;

export const posts: Post[] = [
  {
    week: 1,
    title: "loop 01",
    date: "2026-03-02",
    km: 38,
    feeling: "good",
    content: WEEK_1_CONTENT,
    published: true,
  },
  ...Array.from({ length: 27 }, (_, i) => ({
    week: i + 2,
    title: `loop ${String(i + 2).padStart(2, "0")}`,
    date: "",
    km: 0,
    feeling: "",
    content: "",
    published: false,
  })),
];
