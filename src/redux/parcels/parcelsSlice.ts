import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import parcelsService from './parcelsService';

export interface Category {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  subcategories: any[];
}

export interface Parcel {
  id: number
  userId: number
  categoryId: number
  full_name: string
  mobile: string
  amount: string
  weight: string
  insured: boolean
  pickup_lat: string
  pickup_long: string
  pickup_address: string
  delivery_lat: string
  delivery_long: string
  delivery_address: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
  media: Medum[]
  category: Category
  title: string
  length: string
  width: string
  height: string
}

export interface Medum {
  id: number
  parcelId: number
  mediaUrl: string
}

export interface Category {
  id: number
  name: string
  status: string
  createdAt: string
  updatedAt: string
}

interface ParcelState {
  categoryList: Category[];
  myParcels: Parcel[];
  marketPlaceList: Parcel[];
}

const initialState: ParcelState = {
  categoryList: [],
  myParcels: [],
  marketPlaceList: []
};


export const getMarketPlace: any = createAsyncThunk(
  'parcel/getMarketPlace',
  async (token: string, thunkAPI) => {
    try {
      const response = await parcelsService.getMarketPlace(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
const parcelsSlice = createSlice({
  name: 'parcels',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMarketPlace.fulfilled, (state, action) => {
      state.marketPlaceList = action.payload.parcels;
    });
  },
});

export default parcelsSlice.reducer;
