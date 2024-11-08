import { useEffect, useState } from "react";
import { TruckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import LoadingButton from "@/components/loading-button";
import { TTruck } from "@/types/trucks";
import { Skeleton } from "@/components/ui/skeleton";
import { useResource } from "@/hooks/use-resource";

export default function TruckList() {
  const {
    data: trucks,
    isLoading,
    error,
    isBulkUpdating,
    handleBulkUpdate,
  } = useResource("trucks");
  const [items, setItems] = useState<TTruck[]>([]);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  useEffect(() => {
    if (trucks) {
      setItems(trucks);
    }
  }, [trucks]);

  async function handleSaveChanges() {
    await handleBulkUpdate({ trucks: items });
    setIsTouched(false);
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center text-muted-foreground">
        {error.message}
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="space-y-4">
        {isLoading && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton className="h-9 w-full" key={i} />
            ))}
          </>
        )}
        {items?.map((truck, idx) => (
          <div
            key={truck.id}
            className="flex items-center gap-6 font-medium md:gap-10"
          >
            <div className="flex min-w-fit items-center gap-4 text-sm text-muted-foreground">
              <TruckIcon className="size-5" />
              <span>Truck {idx + 1}</span>
            </div>
            <Switch
              checked={truck.is_active}
              onCheckedChange={(checked) => {
                const value = checked;
                const newPacking = { ...truck, is_active: value };
                const newPackingList = items.map((item) =>
                  item.id === newPacking.id
                    ? {
                        ...item,
                        is_active: newPacking.is_active,
                      }
                    : item,
                );
                setItems(newPackingList);
                setIsTouched(true);
              }}
            />
            <Input
              value={truck.name}
              onChange={(e) => {
                const value = e.target.value;
                const newPacking = { ...truck, name: value };
                const newPackingList = items.map((item) =>
                  item.id === newPacking.id
                    ? {
                        ...item,
                        name: newPacking.name,
                      }
                    : item,
                );
                setItems(newPackingList);
                setIsTouched(true);
              }}
            />
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div
          className={cn("flex transition-opacity duration-500 sm:justify-end", {
            "invisible opacity-0": !isTouched,
            "visible opacity-100": isTouched,
          })}
        >
          <div className="flex min-h-9 w-full gap-4 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setItems(trucks!);
                setIsTouched(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              type="button"
              className="w-full sm:w-auto"
              disabled={isBulkUpdating}
              loading={isBulkUpdating}
              onClick={handleSaveChanges}
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
