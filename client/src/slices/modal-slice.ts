import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalKeys = "extraStop" | "closeRequest" | "editDeposit" | "editMoveSize" | "editPacking";

interface ModalState {
  currentModal: ModalKeys | null
  open: boolean
}

const initialState: ModalState = {
  currentModal: null,
  open: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalKeys>) => {
      state.currentModal = action.payload;
      state.open = true
    },
    closeModal: (state) => {
      state.currentModal = null;
      state.open = false
    },
  }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
