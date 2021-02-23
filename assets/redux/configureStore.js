import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { favorites } from './favorite';
import { state } from './navigation';
import { persistStore, persistCombineReducers } from 'redux-persist'
import AsyncSTorage from '@react-native-async-storage/async-storage';


export const ConfigureStore = () => {
    
    const config = {
        key: 'root',
        storage: AsyncSTorage,
        debug: true
    }


    const store = createStore(
        persistCombineReducers(config, {
            favorites
        }),
        applyMiddleware(thunk, logger)
    )

    const persistor = persistStore(store);

    return { persistor, store };

}