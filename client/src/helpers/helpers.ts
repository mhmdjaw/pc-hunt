import axios, { CancelTokenSource } from "axios";
import React, { useEffect, useRef } from "react";
import { CartItem } from "../api/cart";

export const calculatePasswordStrength = (
  password: string
): {
  error: string | null;
  bar: { color: string; backgroundColor: string; value: number };
} => {
  let conditionsFulfilled = 0;
  conditionsFulfilled += password.length > 7 ? 1 : 0;
  conditionsFulfilled += /[a-z]/g.test(password) ? 1 : 0;
  conditionsFulfilled += /[A-Z]/g.test(password) ? 1 : 0;
  conditionsFulfilled += /[0-9]/g.test(password) ? 1 : 0;
  conditionsFulfilled += /[ !"#$%&'()*+,-./:\\;<=>?@[\]^_`{|}~]/g.test(password)
    ? 1
    : 0;

  let error = null;
  if (conditionsFulfilled < 5) {
    error =
      "Your password should have at least 8 characters, one uppercase, one lowercase, one number and one special character";
  }

  const bar = {
    color: "barColorPrimary",
    backgroundColor: "colorPrimary",
    value: 0,
  };
  if (conditionsFulfilled > 0) {
    if (conditionsFulfilled > 2) {
      if (conditionsFulfilled > 4) {
        [bar.color, bar.backgroundColor, bar.value] = [
          "barColorStrong",
          "colorStrong",
          100,
        ];
      } else {
        [bar.color, bar.backgroundColor, bar.value] = [
          "barColorMed",
          "colorMed",
          66,
        ];
      }
    } else {
      [bar.color, bar.backgroundColor, bar.value] = [
        "barColorWeak",
        "colorWeak",
        33,
      ];
    }
  }

  return { error, bar };
};

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

export const round = (num: number, fractionDigits: number): number =>
  Math.round((num + Number.EPSILON) * Math.pow(10, fractionDigits)) /
  Math.pow(10, fractionDigits);

export const displayCost = (num: number, fractionDigits: number): string =>
  num.toLocaleString("EG", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
  });

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const displayDate = (ISOdate: string): string => {
  const date = new Date(ISOdate);
  return `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

export const calculateOrderSummary = (
  items: CartItem[]
): { subtotal: number; taxes: number; loading: boolean } => {
  const subtotal = items.reduce(
    (accumulator, item) => accumulator + item.product.price * item.quantity,
    0
  );
  const taxes = 0.13 * subtotal;
  return {
    subtotal: round(subtotal, 2),
    taxes: round(taxes, 2),
    loading: false,
  };
};

export const limitTextLength = (
  text: string,
  limitedLength: number
): string => {
  text.length > limitedLength
    ? text.substring(0, limitedLength - 1) + "..."
    : text;
  if (text.length > limitedLength) {
    text = text.substring(0, limitedLength);
    const lastSpace = text.lastIndexOf(" ");
    return text.substring(0, lastSpace) + "...";
  } else {
    return text;
  }
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
