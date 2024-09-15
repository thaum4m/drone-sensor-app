import { DataSource } from 'typeorm';
import baseDbConfig from './db.config';
import { Sensor } from 'src/entities/sensor.entity';

export default new DataSource({
    ...baseDbConfig, // Pass in loaded env.    
    dropSchema: false, // Should this be used?
    logging: false,
    entities: [Sensor],
});

