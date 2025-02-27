import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

// import { updateRequestAction } from "@/actions/request";
import { formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { api } from "@/api";

interface PairedRequestInfoProps {
  currentRequestId: number;
  serviceName: string;
  pairedRequestId: number | null;
  movingDate: string | null;
  type: "in" | "out";
}

type TStorageIcons = {
  [key: string]: string;
};

const storageIcons = {
  "Moving & Storage": "/svg-icons/warehouse.svg",
  "Overnight Truck Storage": "/svg-icons/truck.svg",
} as TStorageIcons;

export default function PairedRequestInfo({
  currentRequestId,
  serviceName,
  pairedRequestId,
  movingDate,
  type,
}: PairedRequestInfoProps) {
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  async function handleDisconnectRequests() {
    setIsDisconnecting(true);
    if (!pairedRequestId) {
      toast.error("Paired request ID is missing.");
      setIsDisconnecting(false);
      return;
    }
    try {
      const responses = await Promise.all([
        api.put(`/requests/${currentRequestId}`, {
          paired_request_id: null,
          is_moving_from_storage: false,
          // status: "not_confirmed",
        }),
        api.put(`/requests/${pairedRequestId}`, {
          paired_request_id: null,
          is_moving_from_storage: false,
          // status: "not_confirmed",
        }),
      ]);

      const [currentRequestResponse, pairedRequestResponse] = responses;

      if (currentRequestResponse && pairedRequestResponse) {
        toast.success("Requests disconnected successfully!");
      } else {
        toast.error("Failed to disconnect requests.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsDisconnecting(false);
    }
  }

  return (
    <div className="flex justify-between gap-2 md:pl-6">
      <div className="relative flex-1 space-y-2 text-sm">
        <p className="font-semibold">Company storage</p>
        <div className="text-primary">
          <Link to={`/crm/requests/${pairedRequestId}`}>
            Request #{pairedRequestId}
          </Link>
        </div>
        <p className="text-muted-foreground">
          Move {type} date: {movingDate && formatDate(movingDate)}
        </p>
        <img
          src={storageIcons[serviceName]}
          className="absolute right-0 top-0 size-10"
        />
      </div>
      <div>
        <Button
          size="icon"
          variant="ghost"
          disabled={isDisconnecting}
          onClick={handleDisconnectRequests}
        >
          <Trash2Icon />
        </Button>
      </div>
    </div>
  );
}
