import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions, runSeeders } from "typeorm-extension";
import dbConfig from '../config/db.config';
import { SensorFactory } from "./sensor.factory";
import { MainSeeder } from "./main.seeder";

const options: DataSourceOptions & SeederOptions = {
    ...dbConfig,
    // Try use src ts for seeding.
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    factories: [SensorFactory],
    seeds: [MainSeeder],
}

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
    // Synchronize database schema based on entities.
    await datasource.synchronize(true);
    await runSeeders(datasource);
    process.exit();
});

