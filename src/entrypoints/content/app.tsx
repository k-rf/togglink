import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import notionLogo from "~/assets/img/notion-logo.svg";
import { useUpdateDailyNotePage } from "~/features/togglink/hooks/use-update-daily-note-page";
import { Entry } from "~/features/togglink/models/entry";
import { findElement } from "~/utils/find-element";

// TODO: リストビューにも対応する。

export const App = () => {
  const { updateDailyNotePage } = useUpdateDailyNotePage();

  const [popupHeader, setPopupHeader] = useState<Element | null>(null);
  const [entry, setEntry] = useState<Entry>();

  const observer = useMemo(
    () =>
      new MutationObserver(() => {
        const popup = document.querySelector('[class*="TimeEntryContextPopup"]');

        if (!popup) return;
        setPopupHeader(popup.querySelector('[class*="ContextPopupControls"]') ?? null);

        const description = popup.querySelector('[class*="DescriptionTrigger"]')?.textContent;
        const projectAndClient = popup.querySelector(
          '[class*="ProjectContentContainer"]',
        )?.textContent;
        const [project, client] = projectAndClient?.split(" ") ?? ["", ""];

        if (!description || !project || !client) return;
        setEntry({ description: description, project: project, client: client });
      }),
    [],
  );

  useEffect(() => {
    findElement('[class*="CalendarContainer"]').then((calendar) => {
      observer.observe(calendar, { childList: true, subtree: true });
    });

    return () => {
      observer.disconnect();
    };
  }, [observer]);

  const handleClick = async () => {
    if (!entry) return;

    updateDailyNotePage({ entry: entry, date: "2025-04-22" });
  };

  return popupHeader
    ? createPortal(
        <button type="button" onClick={handleClick}>
          <img src={notionLogo} alt="Notion" width={24} />
        </button>,
        popupHeader,
      )
    : null;
};
