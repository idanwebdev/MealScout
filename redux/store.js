import { configureStore } from '@reduxjs/toolkit'
import localSupplySlicer from './localSupplySlicer'
import realSupplySlicer from './realSupplySlicer'
import appSlicer from './appSlicer'

export const store = configureStore({
  reducer: {
    userSupply: localSupplySlicer,
    data: realSupplySlicer,
    app: appSlicer
  },
})