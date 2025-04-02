import { createSlice } from "@reduxjs/toolkit";

interface AddTaskModalState {
  isModalOpen: boolean;
  isAdminModalOpen: boolean;
}

const initialState: AddTaskModalState = {
  isModalOpen: false,
  isAdminModalOpen: false
};

const addTaskModalSlice = createSlice({
  name: "addTaskModal",
  initialState,
  reducers: {
    toggleAddTaskModalOpen: (state) => {
      state.isModalOpen = true;
    },
    toggleAddTaskModalClose: (state) => {
      state.isModalOpen = false;
    },
    toggleAddAdminModalOpen: (state) => {
      state.isAdminModalOpen = true;
    },
    toggleAddAdminModalClose: (state) => {
      state.isAdminModalOpen = false;
    },
  },
});

export const { toggleAddTaskModalOpen, toggleAddTaskModalClose, toggleAddAdminModalOpen, toggleAddAdminModalClose } =
  addTaskModalSlice.actions;
export default addTaskModalSlice.reducer;
