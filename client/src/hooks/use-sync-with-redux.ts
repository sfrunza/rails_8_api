import { useEffect } from "react";
import { useAppDispatch } from "@/store";
// import { setOriginalRequest, setRequest } from "@/slices/requestSlice";
import { TFullRequest } from "@/types/request";
import { setRequest } from "@/slices/request-slice";
// import { getRequestFromLocalStorage } from "@/actions/request";

export default function useSyncWithRedux(request?: TFullRequest) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!request) return

    // const local = getRequestFromLocalStorage(request.id);
    // if (local) {
    //   // updateRequestInLocalStorage({ ...state.request, ...action.payload });
    //   dispatch(setRequest(local));
    //   // dispatch(setOriginalRequest(local));
    // } else {
    // }


    dispatch(setRequest(request));
    // dispatch(setOriginalRequest(request));


    // const openedRequest = getRequestFromLocalStorage(request.id);

    // console.log('openedRequest', openedRequest);

    // if (openedRequest) {
    //   dispatch(setRequest(openedRequest));
    // } else {
    //   dispatch(setRequest(request));
    // }

    // dispatch(setOriginalRequest(request));


  }, [request, dispatch]);
}
