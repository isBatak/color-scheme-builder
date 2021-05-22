export const generateColors = (definedColors: string[], scales: number[]) => {
  const colors = [...definedColors];

  for (let i = 0; i < colors.length; i++) {
    if (!colors[i]) {
      const j = colors.slice(i).findIndex(Boolean) + i; // firstNextColorIndex

      colors[i] = getColor(
        scales[i - 1],
        colors[i - 1],
        scales[j],
        colors[j],
        scales[i]
      );
    }
  }

  return colors;
};

const getColor = (
  scale1: number,
  color1hex: string,
  scale2: number,
  color2hex: string,
  scale: number
) => {
  const color1 = hexToRgb(color1hex);
  const color2 = hexToRgb(color2hex);

  const color = color1.map((c1, i) => {
    const c2 = color2[i];
    const percentage = (scale - scale1) / (scale2 - scale1);
    return Math.round((c2 - c1) * percentage + c1);
  });

  return rgbToHex(color);
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
