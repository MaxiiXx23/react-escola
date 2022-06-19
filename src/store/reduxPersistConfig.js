import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import authSlice from './slices/auth';

const reducers = combineReducers({
    auth: authSlice
})
const persistConfig = {
    key: 'authApi',
    storage,
    whiteList: ['auth']
}

const persistedReducers = persistReducer(persistConfig, reducers)

export { persistedReducers }