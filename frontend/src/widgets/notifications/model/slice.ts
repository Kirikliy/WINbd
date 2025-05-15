import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from './types';

export const userSlice = createSlice({
  initialState: [] as Notification[],
  name: 'notifications',
  reducers: {
    addNotification: (state, { payload }: PayloadAction<Notification>) => {
      state.push(payload);
    },
  },
});

export const { addNotification } = userSlice.actions;

export default userSlice;
