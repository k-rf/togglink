import { useEffect, useState } from "react";

import { toTimeFormat } from "~/utils/to-time-format";

const nowSeconds = () => Math.floor(Date.now() / 1000);

export type TimerStatus = "running" | "paused";

interface Props {
  initialSeconds: number;
  status: TimerStatus;
}

export const useTimer = ({ initialSeconds, status }: Props) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(nowSeconds() - initialSeconds);
    }, 1000);

    if (status === "paused") clearInterval(timer);
    setSeconds(nowSeconds() - initialSeconds);

    return () => clearInterval(timer);
  }, [initialSeconds, status]);

  return toTimeFormat(seconds);
};
