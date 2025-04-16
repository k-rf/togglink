import React from "react";

import { sizeVariants } from "./icon-button.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: keyof typeof sizeVariants;
  children: React.ReactElement<{ size: string }>;
}

export const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ size, children, ...props }, ref) => {
    return (
      <button {...props} className={sizeVariants[size]} ref={ref}>
        {React.cloneElement(children, { size: "100%" })}
      </button>
    );
  },
);
