import { initTRPC } from "@trpc/server";
import { z } from "zod";

import { notionConfigStorage } from "~/features/notion-config/storages/notion-config.storage";
import { dailyNoteNotionApi } from "~/features/togglink/api/daily-note.notion.api";
import { todoNotionApi } from "~/features/togglink/api/todo.notion.api";
import { DateString } from "~/types";

const t = initTRPC.create({
  isServer: false,
  allowOutsideOfServer: true,
});

export const appRouter = t.router({
  findTodoPage: t.procedure.input(z.object({ title: z.string() })).query(async ({ input }) => {
    const config = await notionConfigStorage.getValue();
    const todoApi = todoNotionApi(config);

    return todoApi.find({ title: input.title });
  }),
  findDailyNotePage: t.procedure
    .input(z.object({ date: z.string().refine((_): _ is DateString => true) }))
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
