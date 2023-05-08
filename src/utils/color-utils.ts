import * as d3 from "d3-scale";

export const distributionFunctionTypes = ["linear", "log", "pow", "sqrt"];

export const generateColors = (
  definedColors: string[],
  scales: number[],
  functionType?: string
) => {
  const colors = [...definedColors];

  for (let i = 0; i < colors.length; i++) {
    if (!colors[i]) {
      const j = colors.slice(i).findIndex(Boolean) + i; // firstNextColorIndex

      colors[i] = getColor(
        scales[i - 1],
        colors[i - 1],
        scales[j],
        colors[j],
        scales[i],
        functionType
      );
    }
  }

  return colors;
};

const getColor: GetColorFunction = (s1, c1, s2, c2, s, f = "linear") => {
  const color1 = hexToRgb(c1);
  const color2 = hexToRgb(c2);
  const color = color1.map((c, i) => functions[f](s1, c, s2, color2[i], s));
  return rgbToHex(color);
};

const functions: Record<string, DistributionFunction> = {
  linear: (s1, c1, s2, c2, s) => {
    const percentage = (s - s1) / (s2 - s1);
    return Math.round((c2 - c1) * percentage + c1);
  },
  log: (s1, c1, s2, c2, s) => {
    let res = d3.scaleLog().domain([s1, s2]).range([c1, c2])(s);
    if (Number.isNaN(res)) {
      return functions.linear(s1, c1, s2, c2, s);
    }
    return Math.round(res);
  },
  pow: (s1, c1, s2, c2, s) => {
    let res = d3.scalePow().domain([s1, s2]).range([c1, c2]).exponent(2)(s);
    return Math.round(res);
  },
  sqrt: (s1, c1, s2, c2, s) => {
    let res = d3.scaleSqrt().domain([s1, s2]).range([c1, c2])(s);
    return Math.round(res);
  },
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
};

const rgbToHex = (rgb: number[]) => {
  const hex = rgb.map((c) => {
    const hex = c.toString(16);
    if (hex.length === 1) return `0${hex}`;
    return hex;
  });

  return `#${hex.join("")}`;
};

type GetColorFunction = (
  scale1: number,
  color1hex: string,
  scale2: number,
  color2hex: string,
  scale: number,
  functionType?: string
) => string;
type DistributionFunction = (
  scale1: number,
  color1: number,
  scale2: number,
  color2: number,
  scale: number
) => number;

export const getChakraUITokens = (
  colors: string[],
  scales: number[]
): Record<string, string> =>
  colors.slice(1, colors.length - 1).reduce((acc, color, i) => {
    const scale = scales[i + 1];
    return {
      ...acc,
      [scale]: color,
    };
  }, {});

export const getChakraUITokensObjectString = (
  colors: string[],
  scales: number[]
) => {
  const tokens = getChakraUITokens(colors, scales);

  return Object.keys(tokens)
    .reduce(
      (prev, current, index) =>
        `${prev}${index === 0 ? "{\n" : "\n"}\t${current}: '${tokens[
          current
        ].toUpperCase()}',`,
      ""
    )
    .concat("\n}");
};
