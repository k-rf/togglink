import { clsx } from "clsx";

import { rootStyle } from "./field.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Field: React.FC<Props> = ({ className, ...props }) => {
  return <input {...props} className={clsx(rootStyle, className)} />;
};
