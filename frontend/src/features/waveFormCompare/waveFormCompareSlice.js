import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  waveformCompare: [],
};

export const waveformCompareSlice = createSlice({
  name: "waveformCompare",
  initialState,
  reducers: {
    reset: (state) => {
      state.waveformCompare = [];

      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setWaveformCompare: (state, action) => {
      state.waveformCompare.push(action.payload);
    },
  },
});

export const { reset, setWaveformCompare } = waveformCompareSlice.actions;
export default waveformCompareSlice.reducer;
