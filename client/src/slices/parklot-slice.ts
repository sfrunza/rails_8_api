import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestState {
  selectedDate: string
  selectedId: number | null;
  open: boolean;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const initialState: RequestState = {
  selectedDate: new Date().toISOString(),
  selectedId: null,
  open: false,
};

const parklotSlice = createSlice({
  name: "parklot",
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload
    },
    setSelectedId: (state, action: PayloadAction<number | null>) => {
      state.selectedId = action.payload
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
  },
});

export default parklotSlice.reducer;
export const { setSelectedDate, setSelectedId, setOpen } = parklotSlice.actions;


