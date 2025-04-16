import { useEffect } from "react";

interface Listener<T extends CallableFunction> {
  addListener(callback: T): void;
  removeListener(callback: T): void;
}

export const useListener = <T extends CallableFunction>(
  listener: Listener<T>,
  handler: T,
  { execOnInit }: { execOnInit?: boolean } = { execOnInit: false },
) => {
  useEffect(() => {
    if (execOnInit) handler();

    listener.addListener(handler);

    return () => listener.removeListener(handler);
  }, [execOnInit, handler, listener]);
};
