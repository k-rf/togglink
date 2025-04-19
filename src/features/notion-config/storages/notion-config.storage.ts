import { useCallback, useEffect, useState } from "react";
import { storage } from "wxt/utils/storage";

interface NotionConfigDataModelV1 {
  apiToken: string;
  dailyNodeDatabaseId: string;
  TodoDatabaseId: string;
}

export const notionConfigStorage = storage.defineItem<NotionConfigDataModelV1>(
  "local:notionConfig",
  {
    version: 1,
    init: () => ({
      apiToken: "apiToken",
      dailyNodeDatabaseId: "dailyNodeDatabaseId",
      TodoDatabaseId: "TodoDatabaseId",
    }),
    fallback: { apiToken: "", dailyNodeDatabaseId: "", TodoDatabaseId: "" },
  },
);

export const useNotionConfigStorage = () => {
  const [notionConfig, setNotionConfig] = useState<NotionConfigDataModelV1>({
    apiToken: "",
    dailyNodeDatabaseId: "",
    TodoDatabaseId: "",
  });

  useEffect(() => {
    notionConfigStorage.getValue().then((notionConfig) => {
      setNotionConfig(notionConfig);
    });
  }, []);

  useEffect(() => {
    const unwatch = notionConfigStorage.watch((next) => {
      setNotionConfig(next);
    });

    return () => unwatch();
  });

  const save = useCallback((data: NotionConfigDataModelV1) => {
    notionConfigStorage.setValue(data);
  }, []);

  return { notionConfig, save };
};
