export default {
    SENSOR_SERVICE_BASE_URL: import.meta.env.VITE_ENABLE_PROXY ? '/api' :
        `${import.meta.env.VITE_SENSOR_SERVICE_BASE_URL}/api`,
    SENSOR_SERVICE_SOCKET: import.meta.env.VITE_SENSOR_SERVICE_BASE_URL,
}
