import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import authReducer from "@/redux/slices/auth-slice";
import {applicationApi} from "@/configuration/api/application-api";

const persistConfig = {
    key: "root",
    storage,
    blacklist: [applicationApi.reducerPath]
};

const rootReducer = combineReducers({
    authReducer: authReducer,
    [applicationApi.reducerPath]: applicationApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
    return  configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(applicationApi.middleware),
    });
}