import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { ListState } from '../types';
import {
  SensorsTable,
  SensorsTableProps,
} from './SensorsTable';
import { fetchSensorsList } from '../state/sensors/fetchSensorsList';
import { update } from '../state/sensors/sensorsSlice';
import CONFIG from '../config/config';

export type SensorsTableLoaderProps = Omit<SensorsTableProps, 'sensors'>;

const socket: Socket = io(CONFIG.SENSOR_SERVICE_SOCKET);

export const SensorsTableLoader = () => {
  const dispatch = useDispatch<AppDispatch>();

  const sensors: ListState = useSelector((state: RootState) => state.sensors);

  useEffect(() => {
    dispatch(fetchSensorsList());
    
    socket.on('connect', () => {
      console.log('SensorsTableLoader - connected!');
    });

    socket.on('disconnect', () => {
      console.log('SensorsTableLoader - disconnected!');
    });

    socket.on('updateSensorEvent', (...args) => {
      console.log('SensorsTableLoader - updateSensorEvent received:', args);
      dispatch(update(args[0]));
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('updateSensorEvent');
    };
  }, [dispatch]);

  return (          
    <SensorsTable sensors={sensors.list} />    
  )
}

export default SensorsTableLoader;