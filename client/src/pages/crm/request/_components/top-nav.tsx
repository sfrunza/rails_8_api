import { ChevronDownIcon, MailIcon, PhoneCallIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router";

import { formatPhone } from "@/lib/utils";

import { useAppSelector } from "@/store";
import { TFullRequest } from "@/types/request";
// import { IsRequestChanged } from "@/slices/request-slice";

// import { IsRequestChanged } from "@/slices/requestSlice";
// import { openModal } from "@/slices/modalSlice";
// import {
//   addRequestToLocalStorage,
//   removeRequestFromLocalStorage,
// } from "@/actions/request";

export default function TopNav() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const request = useAppSelector((state) => state.request.request);
  const hasChanged = useAppSelector((state) => state.request.hasChanges);

  if (!request) return null;

  const customer =
    request.customer_id && request.customer?.id
      ? request.customer
      : {
          first_name: "__________",
          last_name: "__________",
          phone: "___________________________",
          email: "___________________________",
        };

  function minimizeRequest(request: TFullRequest): void {
    console.log("minimizeRequest", request);
    // addRequestToLocalStorage(request);
    navigate(-1);
  }

  function closeRequest(requestId: number): void {
    console.log("closeRequest", requestId);
    // removeRequestFromLocalStorage(requestId);
    navigate(-1);
  }

  return (
    <div className="flex justify-between p-4 md:h-20 md:items-center md:pl-7">
      <div className="flex flex-col flex-wrap gap-2 text-sm tracking-wide md:flex-row md:items-center md:gap-8">
        <h1 className="text-xl font-bold">
          {customer?.first_name + " " + customer?.last_name}
        </h1>
        <a
          href={`tel:${customer?.phone || "#"}`}
          className="flex items-center gap-4 font-medium text-primary"
        >
          <PhoneCallIcon className="size-4" />

          {formatPhone(customer?.phone)}
        </a>
        <p className="flex items-center gap-4 font-medium text-muted-foreground">
          <MailIcon className="size-4" />
          {customer?.email}
        </p>
      </div>
      <div className="flex gap-2">
        <ChevronDownIcon
          className="size-6 cursor-pointer text-muted-foreground hover:text-slate-900"
          onClick={() => minimizeRequest(request)}
        />
        <XIcon
          className="size-6 cursor-pointer text-muted-foreground hover:text-slate-900"
          onClick={() => {
            if (hasChanged) {
              // dispatch(openModal("closeRequest"));
              closeRequest(request.id);
            } else {
              closeRequest(request.id);
            }
          }}
        />
        {/* <CloseButton closeRequest={closeRequest} /> */}
      </div>
    </div>
  );
}
