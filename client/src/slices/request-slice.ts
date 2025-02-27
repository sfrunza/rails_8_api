import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFullRequest } from "@/types/request";

interface RequestState {
  request: TFullRequest | null;
  changes: Partial<TFullRequest>,
  hasChanges: boolean,
}

const initialState: RequestState = {
  request: null,
  changes: {},
  hasChanges: false,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setRequest(state, action: PayloadAction<TFullRequest>) {
      state.request = {
        ...state.request,
        ...action.payload
      }
    },
    updateField: (state, action: PayloadAction<Partial<TFullRequest>>) => {
      state.changes = {
        ...state.changes,
        ...action.payload
      }
      state.hasChanges = !!Object.keys(state.changes).length
    },
    resetChanges(state) {
      state.changes = {};
      state.hasChanges = false;
    },
  },
});

export default requestSlice.reducer;
export const { setRequest, updateField, resetChanges } = requestSlice.actions;


