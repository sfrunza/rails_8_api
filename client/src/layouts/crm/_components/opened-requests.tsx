// import { useEffect, useState } from "react";

// import { ChevronUpIcon } from "lucide-react";
// import { useNavigate } from "react-router";

// import useServices from "@/hooks/useServices";

// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { TFullRequest } from "@/types/request";

// export default function OpenedRequests() {
//   const navigate = useNavigate();
//   const [openedRequests, setOpenedRequests] = useState<TFullRequest[]>([]);
//   const { services } = useServices();

//   useEffect(() => {
//     const storedRequests = localStorage.getItem("OPENED_REQUESTS");
//     if (storedRequests) {
//       setOpenedRequests(JSON.parse(storedRequests));
//     }
//   }, []);

//   function handleRequestClick(requestId: number) {
//     navigate(`/crm/requests/${requestId}`);
//   }

//   return (
//     <div className="fixed bottom-0 z-50">
//       <ScrollArea className="w-screen whitespace-nowrap">
//         <div className="flex w-max space-x-1">
//           {openedRequests.map((request) => {
//             const service = services?.find((s) => s.id === request?.service_id);
//             return (
//               <button
//                 type="button"
//                 key={request.id}
//                 onClick={() => handleRequestClick(request.id)}
//                 className="flex justify-between gap-10 rounded-t-sm border bg-muted shadow"
//               >
//                 <div className="px-2 py-1 text-start text-xs font-bold leading-4">
//                   <p className="text-sm tracking-wide">
//                     {request.customer?.first_name} {request.customer?.last_name}
//                   </p>
//                   <p className="font-medium">Request #{request.id}</p>
//                   <p className="text-primary">{service?.name}</p>
//                 </div>
//                 <div className="flex h-full w-full items-center justify-center p-2">
//                   <ChevronUpIcon className="size-6 text-muted-foreground hover:text-slate-900" />
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>
//     </div>
//   );
// }

export default function OpenedRequests() {
  return <div>OpenedRequests</div>;
}
