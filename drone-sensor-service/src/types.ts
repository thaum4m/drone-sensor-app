export enum SensorStatus {
    Online = 'online',
    Offline = 'offline',
};

export type SensorEmitOptions = {
    max?: number;
    delayMs?: number;
}

export interface SensorEvent {
    name: string;
    serialNumber: string;
    firmwareVer: string;
    status: string;
}

export type SensorEventResponse = {
    isRegistered: boolean,
    error?: boolean,
    payload: SensorEvent,
}