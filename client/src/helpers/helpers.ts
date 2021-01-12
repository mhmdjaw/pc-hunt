export const hexToRgba = (hex: string, alpha: number): string => {
  let c = hex.substring(1).split("");
  if (c.length === 3) {
    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
  }
  const rgb = Number("0x" + c.join(""));
  return (
    "rgba(" +
    [(rgb >> 16) & 255, (rgb >> 8) & 255, rgb & 255].join(",") +
    `,${alpha})`
  );
};

export const rgbToRgba = (color: string, alpha: number): string => {
  return color.replace(")", `, ${alpha})`).replace("rgb", "rgba");
};
