import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberLiteralType } from "typescript";
import type { RootState } from "../../src/store";
interface ScorePair {
  LogMAR: number;
  correct: number;
}

// Define a type for the slice state
interface TestState {
  curLogMAR: number;
  Identified: Array<number>;
  distance: number;
}

// Define the initial state using that type
const initialState: TestState = {
  curLogMAR: 1.0,
  Identified: [],
  distance: 3,
};

export const testSlice = createSlice({
  name: "tests",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCorrect: (state, action: PayloadAction<ScorePair>) => {
      state.Identified[action.payload.LogMAR] = action.payload.correct;
    },
    setLogMAR: (state, action: PayloadAction<number>) => {
      state.curLogMAR = action.payload;
    },
    setDistance: (state, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },
    incrementCorrect: (state, action: PayloadAction<number>) => {
      state.Identified[action.payload] =
        state.Identified[action.payload] !== undefined
          ? (state.Identified[action.payload] as number) + 1
          : 1;
    },
    decrementCorrect: (state, action: PayloadAction<number>) => {
      state.Identified[action.payload] =
        state.Identified[action.payload] !== undefined
          ? (state.Identified[action.payload] as number) - 1
          : 0;
    },
    clearIdentified: (state) => {
      state.Identified = [];
    },
  },
});

export const {
  setCorrect,
  incrementCorrect,
  decrementCorrect,
  clearIdentified,
  setDistance,
  setLogMAR,
} = testSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIdentified = (state: RootState) => state.tests.Identified;
export const selectCurLogMAR = (state: RootState) => state.tests.curLogMAR;
export const selectDistance = (state: RootState) => state.tests.distance;
export default testSlice.reducer;
