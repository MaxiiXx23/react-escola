import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authSaga from './slices/sagas';
import { persistedReducers } from './reduxPersistConfig';
import { persistStore } from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();


const store =  configureStore({
    reducer: persistedReducers,
    middleware: [sagaMiddleware]
       
})

sagaMiddleware.run(authSaga);
export const persistor = persistStore(store);
export default store;