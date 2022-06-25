import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState = {}

export const localSupplySlicer = createSlice({
  name: 'localSupply',
  initialState,
  reducers: {
    addItems: (state, action) => {
      if(state[action.payload.category]) {
        state[action.payload.category].push(action.payload.ingredient)
      }else {
        state[action.payload.category] = [action.payload.ingredient]
      }
    },
  },
})


export const { addItems } = localSupplySlicer.actions
export default localSupplySlicer.reducer