import { Department } from "./department.payload";

export class EmployeeResponsePayload {

    id!: Number;
    employeeIdentifier!: string;
    firstname!: string;
    lastname!: string;
    email!: string;
    birthdate!: Date;
    department!: Department;
    street!: string;
    houseNumber!: string;
    zipCode!: string;
    
}