export const parseJSONToObjectSafely = <T extends any>(json: string): T => {
  try {
    return JSON.parse(json);
  } catch (_) {
    return {} as T;
  }
};
