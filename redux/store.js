import { configureStore } from '@reduxjs/toolkit'
import localSupplySlicer from './localSupplySlicer'
export const store = configureStore({
  reducer: {
    userSupply: localSupplySlicer
  },
})