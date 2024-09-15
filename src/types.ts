export type SensorStatus = 'online' | 'offline';

export interface SensorEvent {
    event: SensorStatus;
    serial: string;
}

export interface Sensor {
    id: number;
    name: string;
    serialNumber: string;
    firmwareVer: string;
    status: SensorStatus;
    createdAt: Date;
    updatedAt: Date;    
}

export type ListState = {
    isFetching?: boolean;
    isError?: boolean;
    errorMessage?: string;
    list: Sensor[];
}

