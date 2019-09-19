export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    homeAddress?: string;
    workAddress?: string;
    isAdmin?: boolean;
    hasCar: boolean;
    token?: string;
    companyName: string;
    phoneNumber: string;
}
