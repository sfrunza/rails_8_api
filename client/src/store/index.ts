import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

import authReducer from "@/slices/auth-slice";
import requestsReducer from "@/slices/requests-slice";
import requestReducer from "@/slices/request-slice";
import modalReducer from "@/slices/modal-slice";
import parklotReducer from "@/slices/parklot-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    requests: requestsReducer,
    request: requestReducer,
    modal: modalReducer,
    parklot: parklotReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(requestsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppSelector = typeof store.getState;

export const useAppSelector = useReduxSelector.withTypes<RootState>();

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useReduxDispatch.withTypes<AppDispatch>();
