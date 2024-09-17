import reducer, { update } from './sensorsSlice';
import { UnknownAction } from '@reduxjs/toolkit';
import { expect } from 'vitest';
import {
    ListState,
    Sensor,
} from '../../types';

describe('sensorsSlice', () => {
    it('should return the intial state', () => {
        expect(reducer(undefined, {} as UnknownAction)).toEqual({
            isFetching: false,
            isError: false,
            errorMessage: '',
            list: [],
        });
    });
    
    it('should update list item when serial numbers match', () => {        
        const state: ListState = {            
            list: [
                { id: 1, serialNumber: '123abc', status: 'online' } as Sensor,
                { id: 2, serialNumber: '124abd', status: 'offline' } as Sensor,
            ]
        };
        const action = update(
            { serialNumber: '124abd', status: 'online' } as Sensor,
        );
        const stateNew = reducer(state, action);

        expect(stateNew).toEqual({
            list: [
                { id: 1, serialNumber: '123abc', status: 'online' },
                { id: 2, serialNumber: '124abd', status: 'online' },
            ],
        });
    });

    it('should not update list item when serial number don\'t match', () => {        
        const state: ListState = {            
            list: [
                { id: 1, serialNumber: '123abc', status: 'online' } as Sensor,
                { id: 2, serialNumber: '124abd', status: 'offline' } as Sensor,
            ]
        };
        const action = update(
            { serialNumber: '124abe', status: 'online' } as Sensor,
        );
        const stateNew = reducer(state, action);

        expect(stateNew).toEqual({
            list: [
                { id: 1, serialNumber: '123abc', status: 'online' },
                { id: 2, serialNumber: '124abd', status: 'offline' },
            ],
        });
    });
})
