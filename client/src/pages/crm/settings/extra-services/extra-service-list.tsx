import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useExtraServices from "@/hooks/use-extra-service";
import { cn } from "@/lib/utils";
import { TExtraService } from "@/types/extra-service";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToFirstScrollableAncestor,
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import ExtraServiceItem from "./extra-service-item";
import ExtraServiceForm from "./extra-service-form";

export default function ExtraServiceList() {
  const { extraServices, isLoading, error, update, isUpdating } =
    useExtraServices();
  const [items, setItems] = useState<TExtraService[]>([]);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (extraServices) {
      setItems(extraServices);
    }
  }, [extraServices]);

  function onDragEnd(event: any) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        index,
      }));

      setItems(updatedItems);
      setOrderChanged(true);
    }
  }

  function onChange(itemId: number, values: Partial<TExtraService>) {
    setItems((prev) => {
      return prev.map((item) =>
        item.id === itemId ? { ...item, ...values } : item,
      );
    });
    setOrderChanged(true);
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center text-muted-foreground">
        {error.message}
      </div>
    );
  }

  return (
    <>
      <ExtraServiceForm />
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="mb-4 grid grid-cols-[18px_3fr_1fr_1fr_1fr] items-center gap-4 text-sm font-medium text-muted-foreground">
          <p></p>
          <p>Service name</p>
          <p>Service cost, $</p>
          <p>Enable</p>
          <p></p>
        </div>
        <Separator />
        {isLoading && <LoadingSkeleton />}
        {extraServices && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[
              restrictToVerticalAxis,
              restrictToFirstScrollableAncestor,
              restrictToParentElement,
            ]}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              <div className="my-6 min-w-[600px] space-y-4">
                {items.map((item) => (
                  <ExtraServiceItem
                    key={item.id}
                    id={item.id}
                    item={item}
                    onChange={onChange}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="border-t pt-4">
        <div
          className={cn("flex transition-opacity duration-500 sm:justify-end", {
            "invisible opacity-0": !orderChanged,
            "visible opacity-100": orderChanged,
          })}
        >
          <div className="flex min-h-9 w-full gap-4 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setItems(extraServices!);
                setOrderChanged(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              type="button"
              className="w-full sm:w-auto"
              disabled={isUpdating}
              loading={isUpdating}
              onClick={async () => {
                await update(items);
                setOrderChanged(false);
              }}
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
      </div>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 py-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="grid grid-cols-[18px_3fr_1fr_1fr_1fr] gap-4">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
    </div>
  );
}
