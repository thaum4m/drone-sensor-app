import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService()

export default {
    type: 'postgres',
    host: configService.getOrThrow('DB_HOST'),
    port: +configService.getOrThrow('DB_PORT'),
    username: configService.getOrThrow('DB_USERNAME'),
    password: configService.getOrThrow('DB_PASSWORD'),
    database: configService.getOrThrow('DB_NAME'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: "_migrations",
    // Used to auto-run migrations.
    migrationsRun: configService.get('DB_MIGRATIONS', false) === 'true',
    // DO NOT USE `synchonize: true` in prod.
    synchronize: configService.get('DB_SYNC', false) === 'true',
    logging: true,
} as PostgresConnectionOptions;

