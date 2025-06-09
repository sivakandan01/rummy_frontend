import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import UserReducer from "./slice/userSlice"
import storage from 'redux-persist/lib/storage';
import MessageReducer from "./slice/messageSlice"

const rootReducer = combineReducers({
    user: UserReducer,
    data: MessageReducer 
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'data']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
})

const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch