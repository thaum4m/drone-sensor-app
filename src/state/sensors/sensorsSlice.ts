import { createSlice } from "@reduxjs/toolkit";
import {
  ListState,
} from '../../types';
import { fetchSensorsList } from "./fetchSensorsList";

const initialState: ListState = {
  isFetching: false,
  isError: false,
  errorMessage: '',
  list: [],
};

const sensorsSlice = createSlice({
  name: "sensors",
  initialState,
  reducers: {
    update: (state, action: Record<string, any>) => {
      state.list.forEach((sensor: Record<string, any>, i: number) => {
        if (sensor.serialNumber === action.payload.serialNumber) {
          // Make it explicit that the list is being updated.
          state.list[i].status = action.status; 
        }
      })        
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSensorsList.pending, state => {         
         state.isFetching = true;
      })
      .addCase(fetchSensorsList.fulfilled, (state, action) => {
        state.isFetching = false;
        state.list = action.payload;        
      })
      .addCase(fetchSensorsList.rejected, state => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = state.errorMessage;
      });
  }
});

export const { update } = sensorsSlice.actions;

export default sensorsSlice.reducer;
