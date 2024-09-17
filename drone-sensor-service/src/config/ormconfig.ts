import { DataSource } from 'typeorm';
import baseDbConfig from './db.config';
import { Sensor } from 'src/entities/sensor.entity';

export default new DataSource({
    ...baseDbConfig, // Pass in loaded env.
    dropSchema: false,
    logging: false,
    entities: [Sensor],
});

