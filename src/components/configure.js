import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    passengerAmount: {},
    flightPort: '',
    flightPortArrive: null,
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setPassengerAmount: (state, action) => {
            state.passengerAmount = action.payload;
        },
        setFlightPort: (state, action) => {
            state.flightPort = action.payload;
        },
        setFlightPortArrive: (state, action) => {
            state.flightPortArrive = action.payload;
        },
    }
})

export const { setPassengerAmount, setFlightPort, setFlightPortArrive } = configure.actions

export default configure.reducer