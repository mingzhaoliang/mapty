import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    position: null,
    isAdding: false,
    relocate: false,
    selectedWorkoutPosition: null,
};

const mapSlice = createSlice({
    name: "map",
    initialState: initialState,
    reducers: {
        setPosition(state, action) {
            state.position = action.payload;
        },
        setIsAdding(state, action) {
            state.isAdding = action.payload;
        },
        setRelocate(state, action) {
            state.relocate = action.payload;
        },
        setSelectedWorkoutPosition(state, action) {
            state.selectedWorkoutPosition = action.payload;
        },
    },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;