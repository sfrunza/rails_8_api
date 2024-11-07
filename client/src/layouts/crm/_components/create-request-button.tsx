import { ChevronDownIcon } from "lucide-react";

// import useServices from "@/hooks/useServices";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingButton from "@/components/loading-button";
import useMovingServices from "@/hooks/use-moving-service";

export default function CreateRequestButton() {
  // const navigate = useNavigate();
  // const { services } = useServices();
  const { movingServices } = useMovingServices();
  // const [isCreating, setIsCreating] = useState(false);

  const enabledServices = movingServices?.filter((service) => service.enabled);

  async function handleCreateRequest(serviceId: number) {
    console.log("serviceId", serviceId);
    // setIsCreating(true);
    // try {
    //   const newRequest = await createRequestAction({ service_id: serviceId });
    //   if (newRequest) {
    //     navigate(`/crm/requests/${newRequest.id}`);
    //   } else {
    //     throw new Error("Failed to create new request.");
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     toast.error(error.message);
    //   }
    // } finally {
    //   setIsCreating(false);
    // }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <LoadingButton loading={false} disabled={false}>
          <span className="flex items-center justify-between gap-2">
            <span className="hidden sm:inline-block">Create Request</span>
            <span className="inline-block sm:hidden">New</span>
            <ChevronDownIcon className="size-5" />
          </span>
        </LoadingButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0">
        <DropdownMenuGroup>
          {enabledServices?.map((service, i) => (
            <DropdownMenuItem
              key={i}
              className="cursor-pointer rounded-none p-2 px-4 text-sm font-medium"
              onClick={() => handleCreateRequest(service.id)}
            >
              {service.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
