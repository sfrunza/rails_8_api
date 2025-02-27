import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus } from "@/types/request";


export type TFilter = TStatus | "all";

interface InitialState {
  filter: TFilter
  page: number;
}

const initialState: InitialState = {
  filter: "pending",
  page: 1,
};

const requestsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<TFilter>) {
      state.filter = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setFilter, setPage } = requestsSlice.actions;
export default requestsSlice.reducer;

