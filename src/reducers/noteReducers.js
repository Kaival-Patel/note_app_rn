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
      for (var i = 0; i < payload.payload.length; i++) {
        state = state.filter(note => note.payload.id !== payload.payload[i]);
      }
      return state;
    },
    UPDATE_NOTE: (state, payload) => {
      var element = state.find(note => note.id === payload.id);
      state[state.indexOf(element)] = payload;
      // state = state.map(note => {
      //   if (note.payload.id == payload.id) {
      //     note.payload.title = payload.title;
      //     note.payload.description = payload.description;
      //   }
      // });
      return state;
    },
  },
});

export const {ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE} = noteReducer.actions;
export default noteReducer.reducer;
