import { MapIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button } from "@/components/ui/button";
import AddressForm from "./address-form";
import ConnectRequestForm from "./connect-request-form";
import PairedRequestInfo from "./paired-request-info";
import { api } from "@/api";
import { LoadingButton } from "@/components/loading-button";
import useRequest from "@/hooks/use-request";
import { TAddress, TFullRequest } from "@/types/request";
import { openModal } from "@/slices/modal-slice";

export default function Addresses() {
  const dispatch = useAppDispatch();
  const { handleRequestUpdate } = useRequest();
  const request = useAppSelector((state) => state.request.request);
  const hasChanged = useAppSelector((state) => state.request.hasChanges);
  const [isCreating, setIsCreating] = useState(false);

  if (!request) return null;

  const { service, is_moving_from_storage, paired_request_id } = request;

  const hasOrigin = service?.name !== "Unloading help";
  const hasDestination =
    service?.name !== "Loading help" &&
    service?.name !== "Packing only" &&
    service?.name !== "Inside move";

  const withStorage =
    service?.name === "Moving & Storage" ||
    service?.name === "Overnight Truck Storage";
  const isMovingFromStorage = is_moving_from_storage;
  const hasPairedRequest = !!paired_request_id;

  const showOrigin = withStorage ? !isMovingFromStorage : hasOrigin;
  const showDestination = withStorage ? isMovingFromStorage : hasDestination;

  const showStorageOrigin =
    withStorage && isMovingFromStorage && hasPairedRequest;
  const showStorageDestination =
    withStorage && !isMovingFromStorage && hasPairedRequest;

  const showPairRequestsButtons = withStorage && !hasPairedRequest;

  async function handleCreateDeliveryRequest() {
    if (!request) return;
    setIsCreating(true);
    try {
      const response = await api.post("/requests", {
        ...request,
        status: "pending",
        paired_request_id: request.id,
        is_moving_from_storage: true,
      });

      const newRequest: TFullRequest = response.data;
      if (newRequest) {
        await handleRequestUpdate(request.id, {
          paired_request_id: newRequest.id,
          is_moving_from_storage: false,
        });
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

  function getFullAddress(address: TAddress) {
    if (!address) return "";
    if (address.street)
      return `${address.street}, ${address.city}, ${address.state}, ${address.zip}`;
    return `${address.city}, ${address.state}, ${address.zip}`;
  }

  function getMapsUrl(a: string, b: string) {
    return `https://www.google.com/maps/dir/?api=1&origin=${a}&destination=${b}`;
  }

  const openGoogleMaps = (adr1: TAddress, adr2?: TAddress | null) => {
    const parking = "99 Rivermoor St, West Roxbury, MA 02132";
    let googleMapsUrl = "";
    if (!adr1) return null;
    googleMapsUrl = getMapsUrl(parking, getFullAddress(adr1));

    if (adr1 && adr2) {
      googleMapsUrl = getMapsUrl(getFullAddress(adr1), getFullAddress(adr2));
    }

    window.open(
      googleMapsUrl,
      "_blank",
      "width=1400,height=850,noopener,noreferrer",
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:pr-6">
      {/* Origin */}
      <div className="flex flex-col gap-2">
        {hasOrigin && (
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <Button
              size="icon"
              onClick={() => openGoogleMaps(request.origin)}
              className="rounded-full text-primary shadow-icon hover:text-primary"
              variant="ghost"
            >
              <MapIcon />
            </Button>
            <p className="capitalize">Origin</p>
          </div>
        )}
        {showOrigin && <AddressForm type="origin" data={request?.origin} />}
        {showStorageOrigin && (
          <PairedRequestInfo
            currentRequestId={request?.id}
            serviceName={service.name}
            movingDate={request?.paired_request?.moving_date}
            pairedRequestId={request?.paired_request_id}
            type="in"
          />
        )}
      </div>

      {/* Destination */}

      <div className="flex flex-col gap-2">
        {hasDestination && (
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <Button
              size="icon"
              onClick={() => openGoogleMaps(request.destination)}
              className="rounded-full text-primary shadow-icon hover:text-primary"
              variant="ghost"
            >
              <MapIcon />
            </Button>
            <p className="capitalize">Destination</p>
            <div className="flex-1 text-end">
              <Button
                onClick={() =>
                  openGoogleMaps(request.origin, request.destination)
                }
                className="rounded-full text-primary shadow-icon hover:text-primary"
                variant="ghost"
              >
                <MapIcon />
                Directions
              </Button>
            </div>
          </div>
        )}

        {showPairRequestsButtons && (
          <div className="space-y-2 md:pl-6">
            <LoadingButton
              disabled={isCreating || hasChanged}
              loading={isCreating}
              onClick={handleCreateDeliveryRequest}
              className="w-full"
              variant="outline"
            >
              <span className="flex items-center">
                <PlusIcon className="mr-2 size-4" />
                Create delivery request
              </span>
            </LoadingButton>
            <ConnectRequestForm />
          </div>
        )}
        {showDestination && (
          <AddressForm type="destination" data={request?.destination} />
        )}
        {showStorageDestination && (
          <PairedRequestInfo
            currentRequestId={request?.id}
            serviceName={service.name}
            movingDate={request?.paired_request?.moving_date}
            pairedRequestId={request?.paired_request_id}
            type="out"
          />
        )}
      </div>

      {request?.stops.map((stop, i) => (
        <div className="flex flex-col gap-6" key={i}>
          {/* <StopForm
            type={stop.type}
            data={{ ...stop, idx: i }}
            actionButton={
              <Button
                variant="ghost"
                size="icon"
                // onClick={() => handleDeleteAddress(i)}
              >
                <Trash2Icon />
              </Button>
            }
          /> */}

          {JSON.stringify(stop)}
        </div>
      ))}
      <div className="grid grid-cols-2 gap-6 lg:col-span-2">
        <div className="col-span-2 lg:col-span-1">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => dispatch(openModal("extraStop"))}
          >
            <PlusIcon className="mr-2 size-4" />
            Add extra stop
          </Button>
        </div>
      </div>
    </div>
  );
}
