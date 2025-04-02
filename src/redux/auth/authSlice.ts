import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

export interface User {
  status: boolean;
  message: string;
  token?: string;
  userData?: UserData;
}

export interface AdminRequest {
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface UserUpdateRequest {
  status: string;
  userId: string;
  token: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  otp: string;
  verification_token: any;
  status: string;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
  imageUrl: string;
}

export interface Profile {
  id: number;
  profile_pic_hash: any;
  profile_pic_ext: any;
  gender: any;
  phone_number: any;
  date_of_birth: any;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface AddTaskModalState {
  userData: User | null;
  isAddAdminSuccess: boolean;
}

const initialState: AddTaskModalState = {
  userData: null,
  isAddAdminSuccess: false
};

export const loginAction: any = createAsyncThunk(
  "user/loginAction",
  async (updateData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await authService.loginUser(
        updateData.email,
        updateData.password
      );
      return response;
    } catch (error) {
      console.log("Update Post action service was not run");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllAdmin: any = createAsyncThunk(
  "user/getAllAdmin",
  async (token: string, thunkAPI) => {
    try {
      const response = await authService.getAllAdmin(token);
      return response;
    } catch (error) {
      console.log("Update Post action service was not run");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllUser: any = createAsyncThunk(
  "user/getAllUser",
  async (token: string, thunkAPI) => {
    try {
      const response = await authService.getAllUser(token);
      return response;
    } catch (error) {
      console.log("Update Post action service was not run");
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const deleteUser: any = createAsyncThunk(
  "user/deleteUser",
  async (body: UserUpdateRequest, thunkAPI) => {
    try {
      const response = await authService.deleteUser(body);
      return response;
    } catch (error) {
      console.log("Update Post action service was not run");
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const updateUser: any = createAsyncThunk(
  "user/updateUser",
  async (body: UserUpdateRequest, thunkAPI) => {
    try {
      const response = await authService.updateUser(body);
      return response;
    } catch (error) {
      console.log("Update Post action service was not run");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addNewAdmin: any = createAsyncThunk(
  "user/addNewAdmin",
  async (body: AdminRequest, thunkAPI) => {
    try {
      const response = await authService.addNewAdmin(body);
      return response;
    } catch (error) {
      console.log("Update Post action service was not run");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userData = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.rejected, (state, action) => {
        state.userData = {
          message: action.payload.message,
          status: false,
        };
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        console.log("loginAction is fulfilled", action.payload);
        state.userData = action.payload;
      })
      .addCase(getAllAdmin.pending, (state) => {
        state.isAddAdminSuccess = false;
      })
      .addCase(addNewAdmin.fulfilled, (state) => {
        state.isAddAdminSuccess = true;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
