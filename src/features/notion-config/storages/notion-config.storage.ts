import { useCallback, useEffect, useState } from "react";
import { storage } from "wxt/utils/storage";

import { DateString } from "~/types";

interface NotionConfigDataModelV1 {
  apiToken: string;
  dailyNoteDatabaseId: string;
  todoRelationPropertyId: string;
  todoDatabaseId: string;
  targetDate: DateString;
}

const notionConfigStorage = storage.defineItem<NotionConfigDataModelV1>("local:notionConfig", {
  version: 1,
  init: () => ({
    apiToken: "",
    dailyNoteDatabaseId: "",
    todoRelationPropertyId: "",
    todoDatabaseId: "",
    targetDate: "",
  }),
  fallback: {
    apiToken: "",
    dailyNoteDatabaseId: "",
    todoRelationPropertyId: "",
    todoDatabaseId: "",
    targetDate: "",
  },
});

const useNotionConfigStorage = () => {
  const [notionConfig, setNotionConfig] = useState<NotionConfigDataModelV1>({
    apiToken: "",
    dailyNoteDatabaseId: "",
    todoRelationPropertyId: "",
    todoDatabaseId: "",
    targetDate: "",
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

  return { notionConfig: notionConfig, save: save };
};

export {
  type NotionConfigDataModelV1 as NotionConfig,
  useNotionConfigStorage,
  notionConfigStorage,
};
