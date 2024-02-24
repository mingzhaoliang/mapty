import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    workouts: [],
    isEditing: null,
    // weather: null,
}

const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        updateWorkout(state, action) {
            const updatedWorkouts = [...action.payload];
            const sortedWorkouts = updatedWorkouts.sort((a, b) => a.timestamp - b.timestamp);

            state.workouts = sortedWorkouts;
        },
        deleteWorkout(state, action) {
            state.workouts = state.workouts.filter(workout => workout.id !== action.payload);
        },
        setIsEditing(state, action) {
            state.isEditing = action.payload;
        },
        removeIsEditing(state, action) {
            state.isEditing = null;
        }
        // setWeather(state, action) {
        //     state.weather = action.payload;
        // },
    },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;