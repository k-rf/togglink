import { useState } from "react";
import { createPortal } from "react-dom";

import notionLogo from "~/assets/img/notion-logo.svg";
import { useNotionConfigStorage } from "~/features/notion-config/storages/notion-config.storage";
import { useUpdateDailyNotePage } from "~/features/togglink/hooks/use-update-daily-note-page";
import { useObserveElement } from "~/hooks/use-observe-element";

import { buttonStyle } from "./app.css";

export const App = () => {
  const { updateDailyNotePage } = useUpdateDailyNotePage();
  const {
    notionConfig: { targetDate },
  } = useNotionConfigStorage();

  const [popup, setPopup] = useState<Element | null>(null);
  const [popupHeader, setPopupHeader] = useState<Element | null>(null);
  const [listItems, setListItems] = useState<Element[]>([]);

  useObserveElement({
    selector: '[class*="Page-EnhancedPage-EnhancedPage"] [class*="TimerContainer"]:nth-child(2)',
  }).$(() => {
    const popup = document.querySelector('[class*="TimeEntryContextPopup"]');

    setPopup(popup);
    setPopupHeader(popup?.querySelector('[class*="ContextPopupControls"]') ?? null);
  });

  useObserveElement({
    selector: '[class*="Page-EnhancedPage-EnhancedPage"] [class*="TimerContainer"]:nth-child(3)',
  }).$((list) => {
    const items = list.querySelectorAll(
      '[class*="TimerItem"] [class*="DescriptionProjectWrapper"]',
    );
    setListItems(Array.from(items));
  });

  const handleClick = async (popup: Element) => {
    const description = popup.querySelector('[class*="DescriptionTrigger"]')?.textContent;
    const projectAndClient = popup.querySelector('[class*="ProjectContentContainer"]')?.textContent;
    const [project, client] = projectAndClient?.split(" ") ?? ["", ""];

    if (!description || !project || !client) return;

    updateDailyNotePage({
      entry: { client: client, project: project, description: description },
      date: targetDate,
    });
  };

  const handleListItemClick = (item: Element) => {
    const description = item.querySelector('[class*="TimeEntryDescription"]')?.textContent;
    const project = item.querySelector('[class*="ProjectLargeDot"]')?.textContent;
    const client = item.querySelector('[class*="ClientName"]')?.textContent;

    if (!description || !project || !client) return;

    updateDailyNotePage({
      entry: { client: client, project: project, description: description },
      date: targetDate,
    });
  };

  return (
    <>
      {popup &&
        popupHeader &&
        createPortal(
          <button type="button" onClick={() => handleClick(popup)}>
            <img src={notionLogo} alt="Notion" width={24} />
          </button>,
          popupHeader,
        )}
      {listItems.map((item) => {
        return createPortal(
          <button className={buttonStyle} type="button" onClick={() => handleListItemClick(item)}>
            <img src={notionLogo} alt="Notion" width={24} />
          </button>,
          item,
        );
      })}
    </>
  );
};
