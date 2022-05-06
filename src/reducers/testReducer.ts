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
  scores: Map<number, number>;
  LogMARScore: number;
  distance: number;
}

// Define the initial state using that type
const initialState: TestState = {
  curLogMAR: 1.0,
  scores: new Map<number, number>(),
  LogMARScore: 1.0,
  distance: 3,
};

export const testSlice = createSlice({
  name: "tests",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<ScorePair>) => {
      state.scores.set(action.payload.LogMAR, action.payload.correct);
    },
    setDistance: (state, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },
    incrementScore: (state, action: PayloadAction<number>) => {
      state.scores.set(
        action.payload,
        state.scores.get(action.payload) !== undefined
          ? (state.scores.get(action.payload) as number) + 1
          : 1
      );
    },
    decrementScore: (state, action: PayloadAction<number>) => {
      state.scores.set(
        action.payload,
        state.scores.get(action.payload) !== undefined
          ? (state.scores.get(action.payload) as number) - 1
          : 0
      );
    },
    setFinalScore: (state, action: PayloadAction<number>) => {
      state.LogMARScore = action.payload;
    },
  },
});

export const {
  setScore,
  setFinalScore,
  incrementScore,
  decrementScore,
  setDistance,
} = testSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectScores = (state: RootState) => state.tests.scores;
export const selectCurLogMAR = (state: RootState) => state.tests.curLogMAR;
export const selectLogMARScore = (state: RootState) => state.tests.LogMARScore;
export const selectDistance = (state: RootState) => state.tests.distance;
export default testSlice.reducer;
