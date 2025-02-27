import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { statusBgColors, statusOptions } from "@/constants/request";
import useRequest from "@/hooks/use-request";
import { useResource } from "@/hooks/use-resource";
import { cn } from "@/lib/utils";
import { updateField } from "@/slices/request-slice";
import { useAppDispatch, useAppSelector } from "@/store";
import { TStatus } from "@/types/request";
import {
  BookCopyIcon,
  ClipboardPenLine,
  MailsIcon,
  PrinterIcon,
  UserRoundIcon,
} from "lucide-react";

export default function StatusService() {
  const { data: services } = useResource("services");
  const { handleRequestUpdate, isUpdating } = useRequest();
  const dispatch = useAppDispatch();
  const { request, changes, hasChanges } = useAppSelector(
    (state) => state.request,
  );

  if (!request) return null;

  const currentStatus = changes.status ?? request.status;
  const currentServiceId = changes.service_id ?? request.service_id;

  function onClickUpdate() {
    if (!request) return;
    handleRequestUpdate(request.id, changes);
  }
  return (
    <div className="px-4 py-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Select
            value={currentStatus}
            onValueChange={(val: TStatus) => {
              dispatch(updateField({ status: val }));
            }}
          >
            <SelectTrigger
              className={`${statusBgColors[currentStatus]} h-11 w-full px-4 text-sm font-medium text-white md:w-[14rem]`}
            >
              <SelectValue placeholder="select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status, i) => {
                return (
                  <SelectItem key={i} value={status.value}>
                    {status.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select
            value={JSON.stringify(currentServiceId || "")}
            onValueChange={(val: string) => {
              dispatch(
                updateField({
                  service_id: parseInt(val),
                }),
              );
            }}
          >
            <SelectTrigger className="h-11 w-full bg-white px-4 text-sm font-medium md:w-[14rem]">
              <SelectValue placeholder="select status" />
            </SelectTrigger>
            <SelectContent>
              {services?.map((service, i) => {
                return (
                  <SelectItem key={i} value={JSON.stringify(service.id)}>
                    {service.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <div className="flex gap-8 md:gap-4 md:pl-10">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-11 rounded-full bg-background text-muted-foreground shadow-icon [&_svg]:size-5"
                  >
                    <MailsIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Emails</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size="icon"
                    variant="ghost"
                    className="size-11 rounded-full bg-background text-muted-foreground shadow-icon [&_svg]:size-5"
                  >
                    <a href={`/account/requests/${request.id}`} target="_blank">
                      <UserRoundIcon />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Client page</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-11 rounded-full bg-background text-muted-foreground shadow-icon [&_svg]:size-5"
                  >
                    <BookCopyIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clone request</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-11 rounded-full bg-background text-muted-foreground shadow-icon [&_svg]:size-5"
                  >
                    <PrinterIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View PDF</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {request.status === "confirmed" && !hasChanges && (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-11 rounded-full bg-background text-muted-foreground shadow-icon [&_svg]:size-5"
                    >
                      <ClipboardPenLine />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Contract</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <div
          className={cn("transition-opacity duration-500", {
            "invisible opacity-0": !hasChanges,
            "visible opacity-100": hasChanges,
          })}
        >
          <LoadingButton
            loading={isUpdating}
            disabled={isUpdating}
            size="lg"
            className="hidden lg:block"
            onClick={onClickUpdate}
          >
            Update request
          </LoadingButton>
        </div>
        {hasChanges && (
          <LoadingButton
            loading={isUpdating}
            disabled={isUpdating}
            size="lg"
            className="absolute bottom-0 left-0 z-50 w-full rounded-none rounded-t-xl py-8 text-base lg:hidden"
            onClick={onClickUpdate}
          >
            Update request
          </LoadingButton>
        )}
      </div>
    </div>
  );
}
