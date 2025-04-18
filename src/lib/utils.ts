import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const reduceString = (
  str: string,
  from: number,
  end: number
): string => {
  return str
    ? str.substring(0, from) + "..." + str.substring(str.length - end)
    : "-";
};

export const commaNumber = (num: number | string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
