export type TFullRequest = {
  id: number;
  status: TStatus;
  moving_date: string | null;
  service_id: number;
  packing_id: number;
  service: {
    id: number;
    name: string;
  };
  packing: {
    id: number;
    name: string;
  };
  work_time: {
    min: number;
    max: number;
  };
  total_time: {
    min: number;
    max: number;
  };
  total_price: {
    min: number;
    max: number;
  };
  min_total_time: number;
  details: {
    delicate_items_question_answer?: string;
    bulky_items_question_answer?: string;
    disassemble_items_question_answer?: string;
    comments?: string;
    is_touched?: boolean;
  };
  size: string;
  start_time_window: number | null;
  end_time_window: number | null;
  travel_time: number;
  crew_size: number;
  rate: number;
  paired_request_id: number | null;
  paired_request: TFullRequest;
  is_moving_from_storage: boolean;
  customer: TCustomer | null;
  customer_id: number;
  origin: TAddress;
  destination: TAddress;
  stops: TStop[];
  sales_notes: string;
  driver_notes: string;
  customer_notes: string;
  dispatch_notes: string;
  deposit: number;
  can_edit_request: boolean;
  truck_ids: number[];
  created_at: Date;
  updated_at: Date;
};
export type TStatus = "pending" | "pending_info" | "pending_date" | "hold" | "not_confirmed" | "confirmed" | "not_available" | "completed" | "spam" | "canceled" | "refused" | "closed" | "expired" | "archived";

export type TAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
  floor: string;
  apt?: string | undefined;
  location?: {
    lat: (...args: unknown[]) => number;
    lng: (...args: unknown[]) => number;
  } | {
    lat: number;
    lng: number;
  } | null | undefined;
}

export type TStop = TAddress & {
  type: string;
};

export type TCustomer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  add_phone?: string | undefined;
  add_email?: string | undefined;
};

export type TMenuRequest = {
  id: number;
  status: TStatus;
  origin: TAddress;
  destination: TAddress;
};
