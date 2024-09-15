import { createAsyncThunk } from "@reduxjs/toolkit";
import { Sensor } from '../../types';
import CONFIG from '../../config/config';
import URLS from '../../config/sensorServiceUrls';

export const fetchSensorsList = createAsyncThunk(
    'sensors/fetchList',
    async (params:Record<string,any>|undefined={}): Promise<Sensor[]> => {
        let url = `${CONFIG.SENSOR_SERVICE_BASE_URL}${URLS.SENSORS_API.FETCH_SENSORS}`;

        if (Object.keys(params).length > 0) {
            url += `?${new URLSearchParams(params)}`;
        }
        const sensorsResp: Response = await fetch(url);
        return await sensorsResp.json();
    }
);
