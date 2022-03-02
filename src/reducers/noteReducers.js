import {createSlice} from '@reduxjs/toolkit';

//INITIAL NOTES ARE EMPTY
const initialState = [];

export const noteReducer = createSlice({
  initialState: initialState,
  name: 'note_reducer',
  reducers: {
    ADD_NOTE: (state, payload) => {
      console.log(payload);
      state.push(payload);
      console.log(state.length);
    },

    REMOVE_NOTE: (state, payload) => {
      for (id of payload.payload) {
        console.info(id);
        state = state.filter(note => note.payload.id !== id);
      }
      console.warn(state.length);
      
    },
  },
});

export const {ADD_NOTE, REMOVE_NOTE} = noteReducer.actions;
export default noteReducer.reducer;
