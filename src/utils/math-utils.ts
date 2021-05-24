export const sortNumbers = (arr: number[]) => {
  return arr.sort((a, b) => a - b);
};

export const logBase = (x: number) => Math.exp(Math.log(x) / 255);

export const log = (x: number, b: number) => {
  return Math.log(x) / Math.log(b);
};

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
