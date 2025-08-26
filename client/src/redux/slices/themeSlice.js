import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    theme: localStorage.getItem("theme") || 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeToggle: (state) => {
            state.theme = state.theme === 'light' ? 'dark': 'light';
            localStorage.setItem("theme", state.theme);
        },
    }
});

export const {themeToggle} = themeSlice.actions;

export default themeSlice.reducer;