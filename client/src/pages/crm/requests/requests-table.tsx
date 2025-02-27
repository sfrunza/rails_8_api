import { useState } from "react";

import { format } from "date-fns";
import { useNavigate } from "react-router";

import { cn, formatDate, formatPhone } from "@/lib/utils";

import { statusBgColors, statusTextColors } from "@/constants/request";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoney } from "@/lib/helpers";
import { TFullRequest } from "@/types/request";

type TStorageIcons = {
  [key: string]: string;
};

const storageIcons: TStorageIcons = {
  "Moving & Storage": "/svg-icons/warehouse.svg",
  "Overnight Truck Storage": "/svg-icons/truck.svg",
};

export default function RequestsTable({
  requests,
}: {
  requests: TFullRequest[];
}) {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  function handleRowClick(id: number) {
    if (selectedId === id) {
      navigate(`/crm/requests/${id}`);
    } else {
      setSelectedId(id);
    }
  }

  return (
    <div className="min-h-[calc(100vh-254px)]">
      <Table className="min-w-[1850px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">#</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Move date</TableHead>
            <TableHead>Customer, phone</TableHead>
            <TableHead>Moving from</TableHead>
            <TableHead>Moving to</TableHead>
            <TableHead>Size of move</TableHead>
            <TableHead>Crew</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Updated at</TableHead>
            <TableHead className="text-right">Est. Quote</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests?.map((request: TFullRequest) => {
            const fullName = request.customer
              ? `${request.customer?.first_name} ${request.customer?.last_name}`
              : "";
            const withStorage =
              request.service.name === "Moving & Storage" ||
              request.service.name === "Overnight Truck Storage";
            const isMovingFromStorage = request.is_moving_from_storage;
            const hasPairedRequest = request?.paired_request;
            const showStorageOrigin =
              withStorage && isMovingFromStorage && hasPairedRequest;

            const showStorageDestination =
              withStorage && !isMovingFromStorage && hasPairedRequest;
            return (
              <TableRow
                key={request.id}
                className={cn(
                  "h-16 text-xs font-semibold hover:cursor-pointer",
                  selectedId === request.id && "bg-muted",
                )}
                onClick={() => handleRowClick(request?.id!)}
                onSelect={() => handleRowClick(request?.id!)}
              >
                <TableCell className="text-sm font-bold">
                  {request.id}
                </TableCell>
                <TableCell>
                  <span className="relative inline-block overflow-hidden rounded px-3 py-1">
                    <span
                      className={`${statusBgColors[request.status]} absolute inset-0 rounded opacity-15`}
                    />
                    <span
                      className={`${statusTextColors[request.status]} relative z-10 text-xs font-medium tracking-wide`}
                    >
                      {request.status}
                    </span>
                  </span>
                </TableCell>
                <TableCell>{request.service.name}</TableCell>
                <TableCell>
                  {formatDate(request.moving_date)}
                  <br />
                  <DaysUntilMove movingDate={request.moving_date ?? null} />
                </TableCell>
                <TableCell>
                  {fullName ?? ""}
                  <br />
                  {formatPhone(request.customer?.phone)}
                </TableCell>
                <TableCell>
                  {showStorageOrigin ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={storageIcons[request.service.name]}
                        className="size-6"
                      />
                      From storage
                    </div>
                  ) : (
                    <>
                      {request.origin.city}
                      <br />
                      {request.origin.state} {request.origin.zip}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {showStorageDestination ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={storageIcons[request.service.name]}
                        className="size-6"
                      />
                      To storage
                    </div>
                  ) : (
                    <>
                      {request.destination.city}
                      <br />
                      {request.destination.state} {request.destination.zip}
                    </>
                  )}
                </TableCell>
                <TableCell>{request.size ?? ""}</TableCell>
                <TableCell>{request.crew_size ?? ""}</TableCell>
                <TableCell>{format(request.created_at, "Pp")}</TableCell>
                <TableCell>{format(request.updated_at, "Pp")}</TableCell>
                <TableCell className="text-right">
                  <PriceDisplay price={request.total_price} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function DaysUntilMove({ movingDate }: { movingDate: string | null }) {
  if (!movingDate) {
    return null;
  }
  const today = new Date();
  const movingDateObj = new Date(movingDate);

  const diffTime = movingDateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isInPast = movingDateObj < new Date(today.toDateString());
  const isToday = diffDays.toString() === "0";
  let value = `in ${diffDays} days`;

  if (isInPast) {
    return null;
  }
  if (isToday) {
    value = "today";
  }
  if (diffDays === 1) {
    value = "tomorrow";
  }

  const color = diffDays < 2 ? "text-destructive" : "text-green-600";

  return <span className={color}>{value}</span>;
}

function PriceDisplay({ price }: { price: { min: number; max: number } }) {
  const { min, max } = price;

  const minPrice = formatMoney(min);
  const maxPrice = formatMoney(max);

  if (max === 0) {
    return minPrice;
  } else if (min === max) {
    return maxPrice;
  } else {
    return `${minPrice} - ${maxPrice}`;
  }
}
