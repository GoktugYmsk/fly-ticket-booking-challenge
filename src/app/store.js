import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import configure from '../components/configure';

const rootReducer = combineReducers({
    passAmount: configure,
    passFlightPort: configure,
    passFlightPortArrive: configure,
    optionDate: configure,
    passInfo: configure,
    passTicket: configure,
    passCheck: configure,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['passAmount', 'passFlightPort', 'passFlightPortArrive', 'optionDate', 'passInfo', 'passTicket', 'passCheck'],
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
