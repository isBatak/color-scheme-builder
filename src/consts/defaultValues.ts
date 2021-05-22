export const defaultScales = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1300,
];

export const defaultColors = defaultScales.map(() => "");
defaultColors[0] = "#FFFFFF";
defaultColors[defaultColors.length - 1] = "#000000";
