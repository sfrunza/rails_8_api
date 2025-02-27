export type TUser = {
  id: number;
  email: string;
  add_email?: string | null;
  password_digest: string;
  phone: string;
  add_phone?: string | null;
  role: string;
  first_name: string;
  last_name: string;
};
