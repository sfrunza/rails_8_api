// import FormSubmitButton from "@/components/FormSubmitButton";
// import Map from "@/components/Map/Map";
import { Button } from "@/components/ui/button";
// import { useModal } from "@/hooks/useModal";
// import useUpdateRequest from "@/hooks/useUpdateRequest";
import { cn } from "@/lib/utils";
// import { ModalType } from "@/slices/modal";
import { useAppSelector } from "@/store";
// import { TStop } from "@/types/request";
import { MapPinIcon, PlusIcon, SquarePenIcon } from "lucide-react";
// import Map from "./map";
// import Map from "./map";

function Locations() {
  const { request } = useAppSelector((state) => state.request);
  // const { openModal } = useModal();

  if (!request) return null;

  const {
    service,
    can_edit_request,
    is_moving_from_storage,
    paired_request_id,
    origin,
    destination,
    stops,
  } = request;

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

  const showAddStopButton = can_edit_request && hasOrigin && hasDestination;

  const onAddStopAction = () => {};

  return (
    <div className="flex grid-cols-2 flex-col-reverse lg:grid">
      <div className="col-span-1 p-4 text-sm">
        {/* Origin */}
        {showOrigin && (
          <AddressItem
            address={origin}
            type="Origin"
            action="editLocations"
            showConnectDots={hasDestination}
            actionData={{
              locations: {
                origin: origin,
                destination: destination,
              },
              tab: "origin",
            }}
          />
        )}

        {showStorageOrigin && (
          <AddressItem
            address={{
              street: "99 Rivermoor St",
              city: "Boston",
              state: "MA",
              zip: "02132",
            }}
            showStorageIcon
            type="Company Storage"
            showConnectDots={hasDestination}
            actionData={{
              locations: {
                origin: origin,
                destination: destination,
              },
              tab: "origin",
            }}
          />
        )}

        {/* Stops */}
        {stops.map((stop, index) => (
          <AddressItem
            key={index}
            address={stop}
            type={stop.type === "pick_up" ? "Pick up" : "Drop off"}
            action="editStop"
            actionData={{
              stop,
            }}
            canRemove
          />
        ))}

        {/* Add Stop Button */}
        {showAddStopButton && (
          <div className="grid grid-cols-12 gap-1">
            <div className="bg-radial-gradient col-span-1 h-full w-full justify-self-center bg-gradient-to-br from-gray-200 via-transparent to-transparent bg-left-top bg-repeat-y"></div>
            <div className="col-span-11 grid pb-4">
              <Button
                className="w-fit"
                variant="outline"
                size="sm"
                onClick={() => onAddStopAction()}
              >
                <PlusIcon />
                Add extra stop
              </Button>
            </div>
          </div>
        )}

        {/* Destination */}
        {showDestination && (
          <AddressItem
            address={destination}
            type="Destination"
            action="editLocations"
            actionData={{
              locations: {
                origin: origin,
                destination: destination,
              },
              tab: "destination",
            }}
          />
        )}
        {showStorageDestination && (
          <AddressItem
            address={{
              street: "99 Rivermoor St",
              city: "Boston",
              state: "MA",
              zip: "02132",
            }}
            showStorageIcon
            type="Company Storage"
            actionData={{
              locations: {
                origin: origin,
                destination: destination,
              },
              tab: "origin",
            }}
          />
        )}
      </div>
      <div className="col-span-1">
        {/* <Map
          origin={request.origin}
          destination={request.destination}
          stops={request.stops}
        /> */}
      </div>
    </div>
  );
}

export default Locations;

type TStorageIcons = {
  [key: string]: string;
};

const storageIcons = {
  "Moving & Storage": "/svg-icons/warehouse.svg",
  "Overnight Truck Storage": "/svg-icons/truck.svg",
} as TStorageIcons;

function AddressItem({
  address,
  type,
  action,
  showStorageIcon,
  actionData,
  canRemove = false,
  showConnectDots = false,
}: {
  address: any;
  type: "Origin" | "Destination" | "Pick up" | "Drop off" | "Company Storage";
  action?: any;
  actionData: any;
  showStorageIcon?: boolean;
  canRemove?: boolean;
  showConnectDots?: boolean;
}) {
  const { request } = useAppSelector((state) => state.request);
  // const { openModal } = useModal();
  // const { isSaving, updateRequestHandler } = useUpdateRequest();

  if (!request) return null;

  const { can_edit_request } = request;

  function onEditAction() {
    // openModal(action, actionData);
  }

  console.log("actionData", actionData);
  console.log("canRemove", canRemove);

  // function onRemoveStop(stop: TStop) {
  //   // const newStops = stops.filter((s) => s !== stop);
  //   // updateRequestHandler(
  //   //   {
  //   //     stops: newStops,
  //   //   },
  //   //   () => {},
  //   // );
  // }

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-12 items-center gap-1 text-blue-600",
          type === "Origin" && "text-green-600",
          type === "Destination" && "text-destructive",
        )}
      >
        <div className="col-span-1">
          <MapPinIcon className="size-4" />
        </div>
        <h3 className="col-span-11 font-semibold">{type}</h3>
      </div>

      <div className="grid grid-cols-12 gap-1">
        <div
          className={cn("col-span-1 h-full w-full justify-self-center", {
            "bg-radial-gradient bg-gradient-to-br from-slate-200 via-transparent to-transparent bg-left-top bg-repeat-y":
              showConnectDots,
          })}
        />
        <div className="col-span-11 grid pb-4 pt-1">
          {/* {!address && actionButton} */}
          {address && (
            <>
              <div className="relative flex items-center gap-4">
                <div>
                  <p>
                    <span className="font-medium">
                      {address?.street || "TBD"},
                    </span>{" "}
                    {address?.city}, {address?.state} {address?.zip}
                  </p>
                  <p className="text-muted-foreground">
                    {address?.apt && <span>Apt. {address.apt} &#x2022; </span>}
                    {address?.floor}
                  </p>
                </div>
                {showStorageIcon && (
                  <div className="flex flex-col gap-2">
                    <img
                      src={storageIcons["Moving & Storage"]}
                      className="absolute bottom-0 size-10"
                    />
                  </div>
                )}
                {!can_edit_request ||
                  (action && (
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onEditAction}
                      >
                        <SquarePenIcon />
                        Edit
                      </Button>
                      {/* {canRemove && (
                      <FormSubmitButton
                        className="w-fit text-destructive"
                        variant="edit"
                        size="sm"
                        onClick={() => onRemoveStop(address)}
                        isPending={isSaving}
                        disabled={isSaving}
                        label={
                          <>
                            {!isSaving && (
                              <Trash2Icon className="mr-2 size-3" />
                            )}
                            Remove
                          </>
                        }
                      />
                    )} */}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
