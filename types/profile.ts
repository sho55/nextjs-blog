export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: EnumRole;
  created_at: string;
  updated_at: string;
};
export enum EnumRole {
    USER = "USER",
    ADMIN = "ADMIN",
}