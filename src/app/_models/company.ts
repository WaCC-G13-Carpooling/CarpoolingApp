import { Address } from "./address";

export class Company {
  id: number;
  name: string;
  baseLocation: string;
  locations: [Address];
}

