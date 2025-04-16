export const toMs = (us: number) => Math.floor(us / 1000);

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("マイクロ秒をミリ秒に変換する", () => {
    it.each([
      [1_000, 1],
      [1_000_000, 1_000],
    ])("toMs(%d) => %d", (us, expected) => {
      expect(toMs(us)).toBe(expected);
    });
  });
}
