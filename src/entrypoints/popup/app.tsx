import "~/assets/css/reset.css";

import { NotionConfigFeature } from "~/features/notion-config";

import { appStyle } from "./app.css";

export const App = () => {
  return (
    <div className={appStyle}>
      <NotionConfigFeature />
    </div>
  );
};
