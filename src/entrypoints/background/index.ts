import { initTRPC } from "@trpc/server";
import { createChromeHandler } from "trpc-chrome/adapter";
import { defineBackground } from "wxt/utils/define-background";
import { z } from "zod";

import { notionConfigStorage } from "~/features/notion-config/storages/notion-config.storage";
import { dailyNoteNotionApi } from "~/features/togglink/api/daily-note.notion.api";
import { todoNotionApi } from "~/features/togglink/api/todo.notion.api";

export default defineBackground({
  main: () => {
    createChromeHandler({
      router: appRouter,
      createContext: () => {},
      onError: () => {},
    });
  },
});

const t = initTRPC.create({
  isServer: false,
  allowOutsideOfServer: true,
});

const appRouter = t.router({
  findTodoPage: t.procedure.input(z.object({ title: z.string() })).query(async ({ input }) => {
    const config = await notionConfigStorage.getValue();
    const todoApi = todoNotionApi(config);

    return todoApi.find({ title: input.title });
  }),
  findDailyNotePage: t.procedure
    .input(z.object({ date: z.string().refine((_): _ is `${number}-${number}-${number}` => true) }))
    .query(async ({ input }) => {
      const config = await notionConfigStorage.getValue();
      const dailyNoteApi = dailyNoteNotionApi(config);

      return dailyNoteApi.find({ date: input.date });
    }),
  updateDailyNotePage: t.procedure
    .input(
      z.object({
        dailyNotePageId: z.string(),
        todoPageId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const config = await notionConfigStorage.getValue();
      const dailyNoteApi = dailyNoteNotionApi(config);

      await dailyNoteApi.update({
        dailyNotePageId: input.dailyNotePageId,
        todoPageId: input.todoPageId,
      });
    }),
});

export type AppRouter = typeof appRouter;
