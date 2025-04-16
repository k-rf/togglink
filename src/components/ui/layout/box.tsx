import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";

import { alienItemVariant, justifyContentVariant } from "~/assets/css/layout.css";

import { rootStyle, widthVar } from "./box.css";

interface Props {
  className?: string | undefined;
  children: React.ReactNode;
  width?: number;
  alignItems?: keyof typeof alienItemVariant;
  justifyContent?: keyof typeof justifyContentVariant;
}

export const Box = ({
  className,
  children,
  width,
  alignItems,
  justifyContent,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={clsx(
        rootStyle,
        alignItems && alienItemVariant[alignItems],
        justifyContent && justifyContentVariant[justifyContent],
        className,
      )}
      style={assignInlineVars({
        [widthVar]: width ? `${width}px` : "100%",
      })}
    >
      {children}
    </div>
  );
};
