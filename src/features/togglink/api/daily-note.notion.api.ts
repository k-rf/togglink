import { Client } from "@notionhq/client";

import { NotionConfig } from "~/features/notion-config/storages/notion-config.storage";
import { DateString } from "~/types";

interface Criteria {
  date: DateString;
}

export const dailyNoteNotionApi = (notionConfig: NotionConfig) => {
  const notionClient = new Client({ auth: notionConfig.apiToken });

  const find = async ({ date }: Criteria) => {
    const daily = await notionClient.databases.query({
      database_id: notionConfig.dailyNoteDatabaseId,
      filter: {
        and: [
          {
            property: "日付",
            date: { on_or_after: `${date}T05:00:00+09:00` },
          },
          {
            property: "日付",
            date: { before: `${date}T06:00:00+09:00` },
          },
        ],
      },
    });

    return daily.results.at(0);
  };

  const update = async ({
    dailyNotePageId,
    todoPageId,
  }: { dailyNotePageId: string; todoPageId: string }) => {
    const todoRelations = await notionClient.pages.properties.retrieve({
      page_id: dailyNotePageId,
      property_id: notionConfig.todoRelationPropertyId,
    });

    if (todoRelations.type !== "property_item") {
      throw new Error("やったことプロパティが存在しません");
    }

    return notionClient.pages.update({
      page_id: dailyNotePageId,
      properties: {
        "やったこと": {
          type: "relation",
          relation: [
            ...todoRelations.results.map((r) => {
              if (r.type !== "relation") {
                throw new Error("やったことプロパティがリレーションではありません");
              }
              return r.relation;
            }),
            { id: todoPageId },
          ],
        },
      },
    });
  };

  return { find: find, update: update };
};
