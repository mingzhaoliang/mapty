import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    workouts: [],
    // weather: null,
}

const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        updateWorkout(state, action) {
            state.workouts = action.payload;
        },
        removeWorkout(state, action) {
            state.workouts = state.workouts.filter(workout => workout.id !== action.payload);
        },
        // setWeather(state, action) {
        //     state.weather = action.payload;
        // },
    },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;