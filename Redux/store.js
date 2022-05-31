import { configureStore } from '@reduxjs/toolkit'
import informationReducer from './informationSlices';
import { setupListeners } from '@reduxjs/toolkit/query'
import locationReducer from './locationSlices';
import driverReducer from './driverSlices';

export const store = configureStore({
    reducer: {
        information: informationReducer,
        location: locationReducer,
        driver: driverReducer
    }
})

setupListeners(store.dispatch)