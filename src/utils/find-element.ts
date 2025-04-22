export const findElement = (selector: string, root: Element = document.body) => {
  return new Promise<Element>((resolve) => {
    const element = document.querySelector(selector);
    if (element) resolve(element);

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(root, { childList: true, subtree: true });
  });
};
