import { createSlice } from '@reduxjs/toolkit'


const initialState = ''

export const appSlicer = createSlice({
  name: 'appSlicer',
  initialState,
  reducers: {
    setPopup: (state, action) => action.payload,
  },
})


export const { setPopup } = appSlicer.actions
export default appSlicer.reducer