import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import libraryReducer from "../features/library/librarySlice";
import waveformReducer from "../features/waveform/waveformSlice";
import categoryReducer from "../features/category/categorySlice";
import gameReducer from "../features/game/gameSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    library: libraryReducer,
    waveform: waveformReducer,
    category: categoryReducer,
    game: gameReducer,
  },
});
