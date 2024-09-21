import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "@/api";
import { CategoryType, Color, Size, Sample } from "@/types";

export const fetchRequiredInfo = createAsyncThunk(
  "requiredInfo/fetchAll",
  async (_, { rejectWithValue }) => {
    const response = await fetchApi("requiredInfo");

    if (!response) {
      return rejectWithValue("Network connection failed. Please try again!");
    }
    return response;
  }
);

interface RequiredInfoState {
  categories: CategoryType[];
  colors: Color[];
  sizes: Size[];
  sample: Sample[];
  status: boolean;
}

const initialState: RequiredInfoState = {
  categories: [],
  colors: [],
  sizes: [],
  sample: [],
  status: false,
};

const requiredInfoSlice = createSlice({
  name: "requiredInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRequiredInfo.pending, (state) => {
      state.status = true;
    });
    builder.addCase(fetchRequiredInfo.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.colors = action.payload.colors;
      state.sizes = action.payload.sizes;
      state.sample = action.payload.sample;

      state.status = false;
    });
    builder.addCase(fetchRequiredInfo.rejected, (state, action) => {
      state.status = false;
      // state.error = action.error
    });
  },
});

export const {} = requiredInfoSlice.actions;

export default requiredInfoSlice.reducer;
