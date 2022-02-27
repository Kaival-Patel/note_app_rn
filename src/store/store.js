import { configureStore } from "@reduxjs/toolkit";
import noteReducers from "../reducers/noteReducers";

export const store = configureStore({
    reducer : {
        note_reducer : noteReducers
    }
});