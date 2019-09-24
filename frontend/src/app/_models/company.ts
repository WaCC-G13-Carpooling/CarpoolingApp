import { Employee } from './employee';

export class Company {
  id: number;
  name: string;
  baseLocation: string;
  locations: [string];
  userName: string;
  password: string;
  employeeList: [Employee];
}

