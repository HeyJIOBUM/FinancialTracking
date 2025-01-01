"use client";

import { makeStore } from "@/redux/make-store";
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from "redux-persist";
import {useRef} from "react";

export function ReduxProvider({ children }) {
    const storeRef = useRef(null)
    const persistorRef = useRef(null)
    if (!storeRef.current || !persistorRef.current) {
        storeRef.current = makeStore()
        persistorRef.current = persistStore(storeRef.current);
    }

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistorRef.current}>
                {children}
            </PersistGate>
        </Provider>
    )
}