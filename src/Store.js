import { configureStore } from '@reduxjs/toolkit';
import PasteReducer from './redux/features/PasteSlice.jsx'

export const store = configureStore({
  reducer: {
    paste : PasteReducer,
  },
})