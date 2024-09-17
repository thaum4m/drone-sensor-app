import { SensorStatus } from "../../types";

export class CreateSensorDto {
    id: number;
    name: string;
    serialNumber: string;
    firmwareVer: string; 
    status: SensorStatus
}
