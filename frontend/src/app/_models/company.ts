import { Address } from "./address";
import { Employee } from './employee';

export class Company {
  id: number;
  name: string;
  baseLocation: Address;
  locations: [Address];
  userName: string;
  password: string;
  employeeList : [Employee]
}

