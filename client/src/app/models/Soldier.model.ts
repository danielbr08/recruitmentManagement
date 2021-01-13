import { Pakal } from "./Pakal.model";

export interface Soldier {
    id: number
    personalNumber: number;
    firstName: string;
    lastName: string;
    squad: string;
    department: string;
    class: string;
    role: string;
    pakal: Pakal;
  }