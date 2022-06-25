import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {user: null}

export const shoppingListSlicer = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})


export const { shoppingList } = shoppingList.actions
export default shoppingList.reducer