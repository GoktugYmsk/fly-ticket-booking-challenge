import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    passengerAmount: {},
    flightPort: '',
    flightPortArrive: null,
    selectedDate: '',
    passengerInfo: {},
    flightTicket: '',
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
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        setPassengerInfo: (state, action) => {
            state.passengerInfo = action.payload;
        },
        setFlightTicket: (state, action) => {
            state.flightTicket = action.payload;
        },
    }
})

export const { setPassengerAmount, setFlightPort, setFlightPortArrive, setSelectedDate, setPassengerInfo, setFlightTicket } = configure.actions

export default configure.reducer