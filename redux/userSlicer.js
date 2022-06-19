import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {user: null}
export const userSlicer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlicer.actions

export default userSlicer.reducer