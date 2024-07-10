import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import themeReducer from './theme/themeSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Combine all the reducers
const rootReducer = combineReducers({
    user: userReducer,
    theme:themeReducer
});

// Configuration for redux-persist
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

// Creating the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Persistor for the store
export const persistor = persistStore(store);
