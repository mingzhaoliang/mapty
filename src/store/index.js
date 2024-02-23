import { configureStore } from '@reduxjs/toolkit';
import mapSliceReducer from './map-slice';

const store = configureStore({
    reducer: {
        map: mapSliceReducer,
    }
});

export default store;