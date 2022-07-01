import { createSlice } from '@reduxjs/toolkit'


const initialState = {}

export const realSupplySlicer = createSlice({
  name: 'realySupply',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.supplyList = action.payload
    },
    setShoppingList: (state, action) => {
      state.shoppingList = action.payload
    }
  },
})


export const { setList, setShoppingList } = realSupplySlicer.actions
export default realSupplySlicer.reducer