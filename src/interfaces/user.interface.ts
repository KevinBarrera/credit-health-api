import { AuthI } from "./auth.interface";

export interface UserI extends AuthI {
  phone: string;
  name: string;
  lastName: string;
  birthDate: Date;
}
