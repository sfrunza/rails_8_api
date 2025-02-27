import { TStatus } from "@/types/request";

export type TStatusExtended = {
  [key in Partial<TStatus | "all">]: number
}

type TStatusOptions = {
  [key in TStatus]: "Pending" | "Pending Info" | "Pending Date" | "Hold" | "Not Confirmed" | "Confirmed" | "Not Available" | "Completed" | "Spam" | "Canceled" | "Refused" | "Closed" | "Expired" | "Archived";
};

const STATUS_OPTIONS: TStatusOptions = {
  pending: "Pending",
  pending_info: "Pending Info",
  pending_date: "Pending Date",
  hold: "Hold",
  not_confirmed: "Not Confirmed",
  confirmed: "Confirmed",
  not_available: "Not Available",
  completed: "Completed",
  spam: "Spam",
  canceled: "Canceled",
  refused: "Refused",
  closed: "Closed",
  expired: "Expired",
  archived: "Archived",
};

type TStatusOption = {
  label: keyof TStatusOptions;
  value: TStatus;
};


export const statusOptions: TStatusOption[] = Object.entries(STATUS_OPTIONS).map(
  ([value, label]) => ({
    label: label as keyof TStatusOptions,
    value: value as TStatus,
  })
);

// Ttabs --------------------------------------

type TTabs =
  | "All Requests"
  | "Pending"
  | "Not Confirmed"
  | "Confirmed"
  | "Not Available"
  | "Completed"
  | "Spam"
  | "Canceled"
  | "Refused"
  | "Closed"
  | "Expired"
  | "Archived";

type TTabOptions = {
  [key in
  | "all"
  | "pending"
  | "not_confirmed"
  | "confirmed"
  | "not_available"
  | "completed"
  | "spam"
  | "canceled"
  | "refused"
  | "closed"
  | "expired"
  | "archived"]: TTabs;
};

const TAB_OPTIONS: TTabOptions = {
  all: "All Requests",
  pending: "Pending",
  not_confirmed: "Not Confirmed",
  confirmed: "Confirmed",
  not_available: "Not Available",
  completed: "Completed",
  spam: "Spam",
  canceled: "Canceled",
  refused: "Refused",
  closed: "Closed",
  expired: "Expired",
  archived: "Archived",
};

type TTabOption = {
  label: TTabs;
  value: keyof TTabOptions;
};

export const tabOptions: TTabOption[] = Object.entries(TAB_OPTIONS).map(
  ([value, label]) => ({
    label: label as TTabs,
    value: value as keyof TTabOptions,
  })
);

export const statusTextColors: Record<TStatus | "all", string> = {
  "all": "text-slate-800",
  "pending": "text-amber-500",
  "pending_info": "text-amber-500",
  "pending_date": "text-amber-500",
  "hold": "text-amber-500",
  "not_confirmed": "text-indigo-500",
  "confirmed": "text-[#00a455]",
  "not_available": "text-slate-800",
  "completed": "text-[#26a9f4]",
  "spam": "text-slate-800",
  "canceled": "text-red-500",
  "refused": "text-slate-800",
  "closed": "text-slate-800",
  "expired": "text-slate-800",
  "archived": "text-slate-800",
};

export const statusBgColors: Record<TStatus | "all", string> = {
  "all": "bg-slate-800",
  "pending": "bg-amber-500",
  "pending_info": "bg-amber-500",
  "pending_date": "bg-amber-500",
  "hold": "bg-amber-500",
  "not_confirmed": "bg-indigo-500",
  "confirmed": "bg-[#00a455]",
  "not_available": "bg-slate-800",
  "completed": "bg-[#26a9f4]",
  "spam": "bg-slate-800",
  "canceled": "bg-red-500",
  "refused": "bg-slate-800",
  "closed": "bg-slate-800",
  "expired": "bg-slate-800",
  "archived": "bg-slate-800",
};

type TFloorOption = { label: string; value: string; isDisabled?: boolean };


export enum FloorOptions {
  "1st/ground floor" = 1,
  "2nd floor" = 2,
  "3rd floor" = 3,
  "4th floor" = 4,
  "5th floor" = 5,
  "Private House" = 6,
  "Storage Unit" = 7,
  "Elevator Building" = 8,
}

export type FloorOptionKeys = keyof typeof FloorOptions;

export const floorOptions: TFloorOption[] = [
  {
    label: "Elevator",
    value: "Elevator Building",
  },
  {
    label: "1",
    value: "1st/ground floor",
  },
  {
    label: "2",
    value: "2nd floor",
  },
  {
    label: "3",
    value: "3rd floor",
  },
  {
    label: "4",
    value: "4th floor",
  },
  {
    label: "5",
    value: "5th floor",
    isDisabled: true,
  },
  {
    label: "House",
    value: "Private House",
  },

  {
    label: "Storage",
    value: "Storage Unit",
  },
];

function generateWorkTimeOptions() {
  const options = [];
  for (let hours = 0; hours < 24; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      const timeInMinutes = hours * 60 + minutes;
      options.push({
        value: timeInMinutes,
        label: `${hours.toString()}:${minutes.toString().padStart(2, "0")}`,
      });
    }
  }
  return options;
}

export const TIME_OPTIONS = generateWorkTimeOptions();
