export type TRate = {
  id: number;
  extra_mover_rate: number;
  extra_truck_rate: number;
  enable: boolean;
  name: string;
  color: string;
  movers_rates: {
    [key: string]: {
      hourly_rate: number;
    };
  };
};

export type TCalendarRate = {
  id: number;
  enable_automation: boolean;
  enable_auto_booking: boolean;
  is_blocked: boolean;
  date: string
  rate_id: number | null;
  rate: TRate;
};


export type TCalendarRateData = {
  [date: string]: TCalendarRate;
};
