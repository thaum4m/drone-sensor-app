import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsModule } from './sensors/sensors.module';

import dbConfig from './config/db.config';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
      ...dbConfig,
      autoLoadEntities: true,
    }),
    SensorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
