import { configureStore } from '@reduxjs/toolkit'
import configure from '../components/configure'

export const store = configureStore({
    reducer: {
        passAmount: configure,
        passFlightPort: configure,
        passFlightPortArrive: configure,
        optionDate: configure,
        passInfo: configure,
        passTicket: configure,
        passCheck: configure,
    },
})