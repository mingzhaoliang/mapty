import { configureStore } from '@reduxjs/toolkit';
import mapSliceReducer from './map-slice';
import dataSliceReducer from './data-slice';

const store = configureStore({
    reducer: {
        map: mapSliceReducer,
        data: dataSliceReducer,
    }
});

export default store;