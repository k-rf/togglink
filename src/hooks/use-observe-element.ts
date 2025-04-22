import { useCallback, useEffect, useMemo, useRef } from "react";

export const useObserveElement = ({
  selector,
  root = document.body,
  once = false,
}: { selector: string; root?: Element; once?: boolean }) => {
  const callbackRef = useRef<(element: Element) => void>(undefined);

  const observer = useMemo(
    () =>
      new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element && callbackRef.current) {
          callbackRef.current(element);

          observer.disconnect();
          if (!once) observer.observe(element, { childList: true, subtree: true });
        }
      }),
    [selector, once],
  );

  useEffect(() => {
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [observer, root]);

  const register = useCallback((fn: (element: Element) => void) => {
    callbackRef.current = fn;
  }, []);

  return { $: register };
};
