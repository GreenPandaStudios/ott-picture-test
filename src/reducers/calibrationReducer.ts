import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../src/store'


interface CalibrationState {
    DPM: number,
    curImage:CalibrationImage
}

interface CalibrationImage{
    pixel_width: number,
    pixel_height: number,
    meters_width: number,
    meters_height: number,
    imagePath: string
}

const CalibrationImages = {
    quarter: {
        pixel_width: 600,
        pixel_height: 600,
        meters_width: .02426,
        meters_height: .02426,
        imagePath: "/images/Quarter.png"
    }
}


// This is the initial page that should be loaded
const initialState : CalibrationState = {
    DPM: 3779.52755906,
    curImage: CalibrationImages.quarter
};

export const calibrateSlice = createSlice({
  name: 'calibrator',
  initialState,
  reducers: {
    setDPM: (state, action: PayloadAction<number>) => {
      state.DPM = action.payload;
    }
  }
});

export const { setDPM } = calibrateSlice.actions;
export const selectCurImage = (state: RootState) => state.calibrator.curImage;
export const selectDPM = (state: RootState) => state.calibrator.DPM;
export default calibrateSlice.reducer;