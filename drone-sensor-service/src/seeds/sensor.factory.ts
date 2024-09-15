import { Faker } from "@faker-js/faker";
import { Sensor } from "../entities/sensor.entity";
import { SensorStatus } from "../types";
import { setSeederFactory } from "typeorm-extension";

export const SensorFactory = setSeederFactory(Sensor, (faker:Faker) => {
    const sensor = new Sensor();
    sensor.name = faker.lorem.word();
    sensor.serialNumber = faker.string.alphanumeric(16);
    sensor.firmwareVer = [
        faker.datatype.number({ min: 1, max: 9 }),
        faker.datatype.number({ min: 1, max: 9 }),
        faker.datatype.number({ min: 1, max: 9 })
    ].join('.');
    sensor.status = faker.datatype.boolean() ? SensorStatus.Offline :
        SensorStatus.Online;
    return sensor;
});
