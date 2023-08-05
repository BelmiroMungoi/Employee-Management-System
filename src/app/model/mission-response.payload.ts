import { StatusResponsePayload } from "./status-response.payload";

export class MissionResponsePayload {

    id!: number;
    missionName!: string;
    startedDate!: string;
    finishedDate!: string;
    missionStatus!: StatusResponsePayload;
}