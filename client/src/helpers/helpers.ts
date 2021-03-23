import axios, { CancelTokenSource } from "axios";
import React, { useEffect, useRef } from "react";

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

const CancelToken = axios.CancelToken;

export const newToken = (): CancelTokenSource => CancelToken.source();

export const useCancelToken = (): React.MutableRefObject<CancelTokenSource | null> => {
  const cancelSource = useRef<CancelTokenSource | null>(null);

  useEffect(() => {
    cancelSource.current = newToken();
    return () => {
      cancelSource.current?.cancel("Component is unmounting");
    };
  }, []);

  return cancelSource;
};
