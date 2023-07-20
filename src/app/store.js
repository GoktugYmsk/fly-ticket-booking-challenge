import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import configureReducer from '../components/configure';
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

// Redux Persist yapılandırma
const persistConfig = {
    key: 'root',
    storage,
    // İstediğiniz durum parçalarını buradan belirtebilirsiniz
    whitelist: ['passAmount', 'passFlightPort', 'passFlightPortArrive', 'optionDate', 'passInfo', 'passTicket', 'passCheck'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false, // Redux Persist ile uygulama durumu içerisindeki döngülerin hatasını engellemek için bu özelliği devre dışı bırakıyoruz
    }),
});

const persistor = persistStore(store);

export { store, persistor };
