import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";

import { alienItemVariant, justifyContentVariant } from "~/assets/css/layout.css";

import { directionVariant, gapVar } from "./stack.css";

interface Props {
  children: React.ReactNode;
  gap?: string;
  direction: keyof typeof directionVariant;
  alignItems?: keyof typeof alienItemVariant;
  justifyContent?: keyof typeof justifyContentVariant;
}

export const Stack = ({
  children,
  direction,
  gap,
  alignItems,
  justifyContent,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={clsx(
        directionVariant[direction],
        alignItems && alienItemVariant[alignItems],
        justifyContent && justifyContentVariant[justifyContent],
      )}
      style={assignInlineVars({ [gapVar]: `${gap ?? 0}` })}
    >
      {children}
    </div>
  );
};
