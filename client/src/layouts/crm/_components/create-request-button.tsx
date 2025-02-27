import { ChevronDownIcon } from "lucide-react";
import { LoadingButton } from "@/components/loading-button";
import { useResource } from "@/hooks/use-resource";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function CreateRequestButton() {
  const navigate = useNavigate();
  const { data: movingServices } = useResource("services");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const enabledServices = movingServices?.filter((service) => service.enabled);

  async function handleCreateRequest(serviceId: number) {
    console.log("serviceId", serviceId);
    setIsCreating(true);
    try {
      const newRequest = await api.post("/requests", {
        service_id: serviceId,
      });

      if (newRequest.data) {
        navigate(`/crm/requests/${newRequest.data.id}`);
      } else {
        throw new Error("Failed to create new request.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsCreating(false);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <LoadingButton loading={isCreating} disabled={isCreating}>
          <span className="flex items-center justify-between gap-2">
            <span className="hidden md:inline-flex">Create Request</span>
            <span className="inline-flex md:hidden">New</span>
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
