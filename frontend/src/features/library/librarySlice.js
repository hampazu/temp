import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import libraryService from "./libraryService";

const initialState = {
  library: [],
  activity: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Private Library
export const getPrivateLibrary = createAsyncThunk(
  "privateLibrary/get",
  async (category, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await libraryService.getPrivateLibrary({ token, category });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get Public Library
export const getPublicLibrary = createAsyncThunk(
  "publicLibrary/get",
  async (category, thunkAPI) => {
    try {
      return await libraryService.getPublicLibrary(category);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create Actvity
export const createActivity = createAsyncThunk(
  "activity/create",
  async (activity, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await libraryService.createActivity(activity, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//update Actvity
export const updateActivity = createAsyncThunk(
  "activity/update",
  async (activity, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await libraryService.updateActivity(activity, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.library = [];
    },
    resetActivity: (state) => {
      state.activity = [];
    },
  },
  _extraReducers: (builder) => {
    builder
      .addCase(getPublicLibrary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublicLibrary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.library = action.payload;
      })
      .addCase(getPublicLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(getPrivateLibrary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrivateLibrary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.library = action.payload;
      })
      .addCase(getPrivateLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.activity = [...action.payload];
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.activity = [...action.payload];
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
  get extraReducers() {
    return this._extraReducers;
  },
  set extraReducers(value) {
    this._extraReducers = value;
  },
});

export const { reset, resetActivity } = librarySlice.actions;
export default librarySlice.reducer;
