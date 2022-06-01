export const wait = (timer: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(res, timer);
  });
};
