import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export interface Category {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddTaskModalState {
  categories: Category[];
}

const initialState: AddTaskModalState = {
  categories: [],
};

export const addCategory: any = createAsyncThunk(
  "user/addCategory",
  async (catData: { name: string; token: string }, thunkAPI) => {
    try {
      const response = await categoryService.addCategory(catData);
      return response;
    } catch (error) {
      console.log("Update Post action service was not run");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCategory: any = createAsyncThunk(
  "user/getCategory",
  async (token: string, thunkAPI) => {
    try {
      const response = await categoryService.getCategory(token);
      return response;
    } catch (error) {
      console.log("Update Post action service was not run");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategory.fulfilled, (state, action) => {
        console.log("loginAction is fulfilled", action.payload);
        state.categories = action.payload.categories;
      });
  },
});

export default categorySlice.reducer;
