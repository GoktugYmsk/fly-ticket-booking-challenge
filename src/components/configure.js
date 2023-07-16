import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    passengerAmount: {},
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setPassengerAmount: (state, action) => {
            state.passengerAmount = action.payload;
        },
    }
})

export const { setPassengerAmount } = configure.actions

export default configure.reducer