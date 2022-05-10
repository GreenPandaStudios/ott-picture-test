import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumberLiteralType } from "typescript";
import type { RootState } from "../../src/store";
import type { ImageData } from "../Images";
import { Images } from "../Images";
interface ScorePair {
  LogMAR: number;
  correct: number;
}

// Define a type for the slice state
interface TestState {
  curLogMAR: number;
  Identified: Array<number>;
  distance: number;
  finalScore: number;
  enabledImages: { name: string; enabled: boolean }[];
}

// Define the initial state using that type
const initialState: TestState = {
  curLogMAR: 1.0,
  Identified: [],
  distance: 3,
  finalScore: 1.0,
  enabledImages: Images.map((a: ImageData) => ({
    name: a.name,
    enabled: true,
  })),
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
    resetTest: (state) => {
      state.Identified = [];
      state.curLogMAR = 1.0;
      state.finalScore = 1.0;
    },
    setFinalScore: (state, action: PayloadAction<number>) => {
      state.finalScore = action.payload;
    },
    enableImage: (state, action: PayloadAction<ImageData>) => {
      for (let i = 0; i < state.enabledImages.length; i++) {
        if (state.enabledImages[i].name === action.payload.name) {
          state.enabledImages[i].enabled = true;
        }
      }
    },
    disableImage: (state, action: PayloadAction<ImageData>) => {
      let i = 0;
      for (i = 0; i < state.enabledImages.length; i++) {
        if (state.enabledImages[i].name === action.payload.name) {
          state.enabledImages[i].enabled = false;
          break;
        }
      }
      //need to make sure there is at least one enabled image
      if (state.enabledImages.find((image) => image.enabled) === undefined) {
        //otherwise, don't disable that image
        state.enabledImages[i].enabled = true;
      }
    },
  },
});

export const {
  setCorrect,
  incrementCorrect,
  decrementCorrect,
  resetTest,
  setDistance,
  setLogMAR,
  setFinalScore,
  enableImage,
  disableImage,
} = testSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIdentified = (state: RootState) => state.tests.Identified;
export const selectCurLogMAR = (state: RootState) => state.tests.curLogMAR;
export const selectDistance = (state: RootState) => state.tests.distance;
export const selectFinalScore = (state: RootState) => state.tests.finalScore;
export const selectEnabledImages = (state: RootState) =>
  state.tests.enabledImages;
export default testSlice.reducer;
