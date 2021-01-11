import { Pakal } from "./Pakal.model";

export interface Soldier {
    personalNumber: number;
    fistName: string;
    lastName: string;
    squad: string;
    department: string;
    class: string;
    role: string;
    pakal: Pakal;
  }