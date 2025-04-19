import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useChromeClient } from "./context/chrome-client.context";

interface Entry {
  description: string;
  project: string;
  client: string;
}

export const App = () => {
  const { chromeClient } = useChromeClient();

  const [calendar, setCalendar] = useState<Element | null>(null);
  const [popupHeader, setPopupHeader] = useState<Element | null>(null);
  const [entry, setEntry] = useState<Entry>();

  const observer = new MutationObserver(() => {
    const popup = document.querySelector('[class*="TimeEntryContextPopup"]');

    if (!popup) return;
    setPopupHeader(popup.querySelector('[class*="ContextPopupControls"]') ?? null);

    const description = popup.querySelector('[class*="DescriptionTrigger"]')?.textContent;
    const projectAndClient = popup.querySelector('[class*="ProjectContentContainer"]')?.textContent;
    const [project, client] = projectAndClient?.split(" ") ?? ["", ""];

    if (!description || !project || !client) return;
    setEntry({ description: description, project: project, client: client });
  });

  const handleClick = async () => {
    if (!entry) return;

    const todoPage = await chromeClient.findTodoPage.query({ title: entry.description });
    const dailyNotePage = await chromeClient.findDailyNotePage.query({ date: "2025-04-21" });

    if (!todoPage || !dailyNotePage) return;

    await chromeClient.updateDailyNotePage.query({
      dailyNotePageId: dailyNotePage.id,
      todoPageId: todoPage.id,
    });
  };

  useEffect(() => {
    findElement('[class*="CalendarContainer"]').then((calendar) => {
      setCalendar(calendar);
    });
  }, []);

  useEffect(() => {
    if (!calendar) return;

    observer.observe(calendar, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [calendar, observer]);

  return popupHeader
    ? createPortal(
        <button type="button" onClick={handleClick}>
          Notion
        </button>,
        popupHeader,
      )
    : null;
};

const findElement = (selector: string, root: Element = document.body, infinite = false) => {
  return new Promise<Element>((resolve) => {
    const element = document.querySelector(selector);
    if (element) resolve(element);

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        if (!infinite) observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(root, { childList: true, subtree: true });
  });
};
