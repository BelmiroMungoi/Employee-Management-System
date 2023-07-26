import { Department } from "./department.payload";

export class EmployeeResponsePayload {

    id!: string;
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