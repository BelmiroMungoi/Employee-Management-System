import { Department } from "./department.payload";
import { PositionPayload } from "./position.payload";

export class EmployeeResponsePayload {

    id!: Number;
    employeeIdentifier!: string;
    firstname!: string;
    lastname!: string;
    email!: string;
    birthdate!: any;
    salary!: any;
    department!: Department;
    positionResponse!: PositionPayload;
    street!: string;
    houseNumber!: string;
    zipCode!: string;
    
}