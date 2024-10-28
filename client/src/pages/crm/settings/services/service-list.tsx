import { useEffect, useState } from 'react';

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToFirstScrollableAncestor,
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import toast from 'react-hot-toast';

import { cn } from '@/lib/utils';

// import useServices from "@/hooks/useServices";

import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import useMovingServices from '@/hooks/use-moving-services';
import { TMovingService } from '@/types/moving-services';
import ServiceItem from './service-item';

export default function ServiceList() {
  const { movingServices, updateMovingServices, isUpdating } =
    useMovingServices();
  const [items, setItems] = useState<TMovingService[]>([]);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (movingServices) {
      setItems(movingServices);
    }
  }, [movingServices]);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const updatedItems = arrayMove(items, oldIndex, newIndex).map(
        (item, index) => ({ ...item, index: index })
      );

      setItems(updatedItems);
      setOrderChanged(true);
    }
  }

  const updateItemName = (itemId: number, value: string) => {
    setItems((prev: TMovingService[]) => {
      return prev.map((item) =>
        item.id === itemId ? { ...item, name: value } : item
      );
    });
    setOrderChanged(true);
  };

  function onEnabledChange(itemId: number, value: boolean) {
    setItems((prev: TMovingService[]) => {
      return prev.map((item) =>
        item.id === itemId ? { ...item, enabled: value } : item
      );
    });
    setOrderChanged(true);
  }

  async function handleSaveChanges() {
    try {
      // const response = await api.post('/moving_services/bulk_update', {
      //   services: items,
      // });

      // console.log(response);
      await updateMovingServices(items, {
        onSuccess: () => {
          toast.success('Changes saved successfully!');
          setOrderChanged(false);
        },
        onError: (error) => {
          toast.error(error.message);
          setItems(movingServices!);
        },
      });
    } catch (err) {
      toast.error('An unexpected error occurred.');
    }
  }

  // if (isLoading) {
  //   return (
  //     <div className="flex w-full items-center justify-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex w-full items-center justify-center text-muted-foreground">
  //       {error.message}
  //     </div>
  //   );
  // }

  return (
    <div className="mt-6 flex flex-col gap-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[
          restrictToVerticalAxis,
          restrictToFirstScrollableAncestor,
          restrictToParentElement,
        ]}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {items.map((item) => (
              <ServiceItem
                key={item.id}
                id={item.id}
                item={item}
                updateItemName={updateItemName}
                onEnabledChange={onEnabledChange}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="border-t pt-4">
        <div
          className={cn('flex transition-opacity duration-500 sm:justify-end', {
            'invisible opacity-0': !orderChanged,
            'visible opacity-100': orderChanged,
          })}
        >
          <div className="flex min-h-9 w-full gap-4 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setItems(movingServices!);
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
