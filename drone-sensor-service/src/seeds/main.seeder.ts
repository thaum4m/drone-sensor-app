import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Sensor } from '../entities/sensor.entity';
import { Logger } from '@nestjs/common';

export class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        Logger.log('Seeding Sensors...');        
        const sensorFactory = factoryManager.get(Sensor);
        await sensorFactory.saveMany(10);
    }
}