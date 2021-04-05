import { Pakal } from "./Pakal.model";

export interface PakalAllocated {
    taskId: number;
    pakalId: number;
    pakalName: string;
    warehouseTotal: number;
    squad1Allocated: number;
    squad2Allocated: number;
    squad3Allocated: number;
    headquartersAllocated: number;
    supportAllocated: number;
    squad1Total: number;
    squad2Total: number;
    squad3Total: number;
    headquartersTotal: number;
    supportTotal: number;
  }