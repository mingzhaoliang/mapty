import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    position: null,
    isClicked: false,
    relocate: false,
};

const mapSlice = createSlice({
    name: "map",
    initialState: initialState,
    reducers: {
        setPosition(state, action) {
            state.position = action.payload;
        },
        setClicked(state, action) {
            state.isClicked = action.payload;
        },
        setRelocate(state, action) {
            state.relocate = action.payload;
        },
    },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;