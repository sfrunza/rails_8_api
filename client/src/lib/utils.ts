import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import parsePhoneNumberFromString from "libphonenumber-js";

const COUNTRY = "US";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatPhone(value: string | undefined) {
  if (!value) return "";
  if (value.length < 3) return value.toString();
  return (
    parsePhoneNumberFromString(value, COUNTRY)?.formatNational().toString() ||
    value
  );
}