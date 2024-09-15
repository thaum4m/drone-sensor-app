import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { SensorStatus } from '../types';

@Entity({ name: 'sensors' })
export class Sensor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    serialNumber: string;

    @Column()
    firmwareVer: string;

    @Column({
        type: "enum",
        enum: ['online', 'offline'],
    })
    status: SensorStatus;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
