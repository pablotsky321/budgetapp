import { BillTypeDTO } from "./BillTypeDTO";

export interface BillDTO {
  id: string;
  billType: BillTypeDTO;
  billName: string;
  billValue: number;
}