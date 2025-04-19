import { Client } from "@notionhq/client";

import { NotionConfig } from "~/features/notion-config/storages/notion-config.storage";

interface Criteria {
  title: string;
}

export const todoNotionApi = (notionConfig: NotionConfig) => {
  const notionClient = new Client({ auth: notionConfig.apiToken });

  const find = async ({ title }: Criteria) => {
    const todo = await notionClient.databases.query({
      database_id: notionConfig.todoDatabaseId,
      filter: {
        property: "名前",
        title: { equals: title },
      },
    });

    return todo.results.at(0);
  };

  const create = ({
    client,
    project,
    description,
  }: { client: string; project: string; description: string }) => {
    notionClient.pages.create({
      parent: { type: "database_id", database_id: notionConfig.todoDatabaseId },
      properties: {
        "名前": {
          type: "title",
          title: [{ type: "text", text: { content: description } }],
        },
        "カテゴリ": {
          type: "select",
          select: { name: `${client}/${project}` },
        },
      },
    });
  };

  return { find: find, create: create };
};
