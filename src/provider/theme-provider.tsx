import { clsx } from "clsx";

import { colorClass, paletteClass, themeClass } from "~/assets/css/theme.css";

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  return <div className={clsx(themeClass, colorClass, paletteClass)}>{children}</div>;
};
