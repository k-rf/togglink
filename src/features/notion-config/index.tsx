import { SaveIcon } from "lucide-react";

import { vars } from "~/assets/css/theme.css";
import { Field } from "~/components/ui/field";
import { IconButton } from "~/components/ui/icon-button";
import { Box } from "~/components/ui/layout/box";
import { Stack } from "~/components/ui/layout/stack";
import { DateString } from "~/types";

import { dateFieldStyle, fieldStyle } from "./index.css";
import { useNotionConfigStorage } from "./storages/notion-config.storage";

export const NotionConfigFeature = () => {
  const { notionConfig, save } = useNotionConfigStorage();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        save({
          apiToken: formData.get("notion-api-token") as string,
          dailyNoteDatabaseId: formData.get("daily-note-database-id") as string,
          todoRelationPropertyId: formData.get("todo-relation-property-id") as string,
          todoDatabaseId: formData.get("todo-database-id") as string,
          targetDate: formData.get("target-date") as DateString,
        });

        window.close();
      }}
    >
      <Stack direction="column" gap={vars.spacing.sm}>
        <Field
          className={fieldStyle}
          name="notion-api-token"
          label="API Token"
          defaultValue={notionConfig.apiToken}
        />
        <Field
          className={fieldStyle}
          name="daily-note-database-id"
          label="Daily Note Database ID"
          defaultValue={notionConfig.dailyNoteDatabaseId}
        />
        <Field
          className={fieldStyle}
          name="todo-database-id"
          label="Todo Database ID"
          defaultValue={notionConfig.todoDatabaseId}
        />
        <Field
          className={fieldStyle}
          name="todo-relation-property-id"
          label="Todo Relation Property ID"
          defaultValue={notionConfig.todoRelationPropertyId}
        />
        <Field
          className={dateFieldStyle}
          name="target-date"
          label="Target Date"
          type="date"
          defaultValue={notionConfig.targetDate}
        />

        <Box justifyContent="end">
          <IconButton size="sm" type="submit">
            <SaveIcon />
          </IconButton>
        </Box>
      </Stack>
    </form>
  );
};
