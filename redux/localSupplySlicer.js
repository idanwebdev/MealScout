import { createSlice } from '@reduxjs/toolkit'


const initialState = {}

export const localSupplySlicer = createSlice({
  name: 'localSupply',
  initialState,
  reducers: {
    addItems: (state, action) => {
      if(action.payload !== '') {
        if(state[action.payload.category]) {
          state[action.payload.category].push(action.payload.ingredient)
        }else {
          state[action.payload.category] = [action.payload.ingredient]
        }
      }
    },
    removeItem: (state, action) => {
      Object.keys(state).forEach((element, index) => {
        const exist = state[element].indexOf(action.payload)
        if(exist > -1) {
          state[element].splice(exist, 1)
          if(state[element].length == 0) {
            delete state[element]
          }
        }
      })
    },
    reset: () => initialState
  },
})


export const { addItems, removeItem, reset } = localSupplySlicer.actions
export default localSupplySlicer.reducer