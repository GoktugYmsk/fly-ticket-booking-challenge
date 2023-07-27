import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import configure from '../components/configure';

const rootReducer = combineReducers({
    passAmount: configure,
    passFlightPort: configure,
    passFlightPortArrive: configure,
    optionDateDepp: configure,
    optionDateArr: configure,
    passInfo: configure,
    passTicket: configure,
    passCheck: configure,
    refreshPass: configure,
    seatReserve: configure,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['passAmount', 'passFlightPort', 'passFlightPortArrive', 'optionDateDepp', 'optionDateArr', 'passInfo', 'passTicket', 'passCheck', 'refreshPass', 'seatReserve'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
