import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import parsePhoneNumberFromString from "libphonenumber-js";
import { format } from "date-fns";

const COUNTRY = "US";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date | null | undefined) {
  if (!date) return "TBD";
  const dt = new Date(date);
  const dtDateOnly = new Date(
    dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000,
  );
  return format(dtDateOnly, "PPP");
}

export function formatPhone(value: string | undefined) {
  if (!value) return "";
  if (value.length < 3) return value.toString();
  return (
    parsePhoneNumberFromString(value, COUNTRY)?.formatNational().toString() ||
    value
  );
}

export function updateDateKeepingTime(
  currentTimestamp: number | null,
  newDate: Date,
): number | null {
  if (!currentTimestamp) {
    return null;
  }
  const currentDate = new Date(currentTimestamp * 1000); // Convert UNIX timestamp to Date object
  const newDateWithTime = new Date(
    newDate.getFullYear(),
    newDate.getMonth(),
    newDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds(),
  );

  return Math.floor(newDateWithTime.getTime() / 1000); // Convert back to UNIX timestamp
}


export function generatePagination(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  const firstPages = 5;
  const lastPages = 2;
  const surroundingPages = 2;

  const pages: (number | string)[] = [];

  // Add first set of pages
  for (let i = 1; i <= Math.min(firstPages, totalPages); i++) {
    pages.push(i);
  }

  if (totalPages <= 1) {
    return [1];
  }

  // Add dots if current page is beyond the first set
  if (currentPage > firstPages + surroundingPages) {
    pages.push("...");
  }

  // Add surrounding pages
  const start = Math.max(firstPages + 1, currentPage - surroundingPages);
  const end = Math.min(totalPages - lastPages, currentPage + surroundingPages);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add dots if the last set is not immediately after the surrounding pages
  if (end < totalPages - lastPages) {
    pages.push("...");
  }

  // Add last set of pages
  for (let i = Math.max(totalPages - lastPages + 1, end + 1); i <= totalPages; i++) {
    pages.push(i);
  }

  return pages;
}
