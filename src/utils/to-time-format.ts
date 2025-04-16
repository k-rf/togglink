const divMod = (b: number) => (a: number) => [Math.floor(a / b), a % b] as const;
const digit2 = (a: number) => a.toString().padStart(2, "0");

type TimeFormat = `${string}:${string}:${string}`;

export const toTimeFormat = (seconds: number): TimeFormat => {
  const to60 = divMod(60);

  const [minutes, sec] = to60(seconds);
  const [hours, min] = to60(minutes);

  return `${digit2(hours)}:${digit2(min)}:${digit2(sec)}`;
};

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("秒を時刻形式に変換する", () => {
    it.each([
      [0, "00:00:00"],
      [1, "00:00:01"],
      [59, "00:00:59"],
      [60, "00:01:00"],
      [61, "00:01:01"],
      [3599, "00:59:59"],
      [3600, "01:00:00"],
      [3601, "01:00:01"],
      [3661, "01:01:01"],
      [86399, "23:59:59"],
      [86400, "24:00:00"],
      [86401, "24:00:01"],
      [89999, "24:59:59"],
      [90000, "25:00:00"],
      [90001, "25:00:01"],
    ])("toTimeFormat(%d) => %s", (seconds, expected) => {
      expect(toTimeFormat(seconds)).toBe(expected);
    });
  });
}
