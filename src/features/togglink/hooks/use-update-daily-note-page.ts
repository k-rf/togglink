import { useCallback } from "react";

import { useChromeClient } from "~/contexts/chrome-client.context";

import { Entry } from "../models/entry";

import type { DateString } from "~/types";

export const useUpdateDailyNotePage = () => {
  const { chromeClient } = useChromeClient();

  const updateDailyNotePage = useCallback(
    async ({ entry, date }: { entry: Entry; date: DateString }) => {
      const todoPage = await chromeClient.findTodoPage.query({ title: entry.description });
      const dailyNotePage = await chromeClient.findDailyNotePage.query({ date: date });

      if (!todoPage || !dailyNotePage) return;

      await chromeClient.updateDailyNotePage.query({
        dailyNotePageId: dailyNotePage.id,
        todoPageId: todoPage.id,
      });
    },
    [chromeClient],
  );

  return { updateDailyNotePage: updateDailyNotePage };
};
