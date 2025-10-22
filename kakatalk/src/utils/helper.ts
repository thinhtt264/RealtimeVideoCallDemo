export const sleep = (second: number): Promise<void> => {
  return new Promise(resolve => setTimeout(() => resolve(), second));
};

export const injectJavaScript = (functionName: string, data: string) => {
  return `
      (function() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = '${functionName}(${data})';
        document.body.appendChild(script);
        true; // note: this is required, or you'll sometimes get silent failures
      })();
    `;
};

export const logger = (...args: unknown[]) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};
