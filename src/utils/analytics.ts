export const trackEvent = (
  name: string,
  params?: object
) => {
  if (window.gtag) {
    window.gtag(
      "event",
      name,
      params
    );
  }
};