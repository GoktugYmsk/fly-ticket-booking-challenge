import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    passengerAmount: {},
    flightPort: '',
    flightPortArrive: null,
    passengerInfo: {},
    flightTicket: '',
    flightTicketReturn: '',
    passName: [],
    passSurname: [],
    pnrCode: [],
    selectedDate: '',
    returnDate: '',
    refreshPassenger: {},
    seat: [],
    seatReturn: [],
    flightPortData: [],
    companyInfo: [],
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
        setFlightTicketReturn: (state, action) => {
            state.flightTicketReturn = action.payload;
        },
        setPassSurname: (state, action) => {
            state.passSurname = action.payload;
        },
        setPnrCode: (state, action) => {
            state.pnrCode = action.payload;
        },
        setPassName: (state, action) => {
            state.passName = action.payload;
        },
        setReturnDate: (state, action) => {
            state.returnDate = action.payload;
        },
        setRefreshPassenger: (state, action) => {
            state.refreshPassenger = action.payload;
        },
        setSeat: (state, action) => {
            state.seat = action.payload;
        },
        setSeatReturn: (state, action) => {
            state.seatReturn = action.payload;
        },
        setFlightPortData: (state, action) => {
            state.flightPortData = action.payload;
        },
        setCompanyInfo: (state, action) => {
            state.companyInfo = action.payload;
        },
    }
})

export const { setPassengerAmount, setFlightPort, setFlightPortArrive, setSelectedDate, setPassengerInfo, setFlightTicket, setPassSurname, setPnrCode, setPassName, setReturnDate, setRefreshPassenger, setSeat, setFlightTicketReturn, setSeatReturn, setFlightPortData, setCompanyInfo } = configure.actions

export default configure.reducer