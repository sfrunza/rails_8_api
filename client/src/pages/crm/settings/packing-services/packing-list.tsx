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

import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import PackingItem from './packing-item';
import { Skeleton } from '@/components/ui/skeleton';
import usePackingServices from '@/hooks/use-packing-services';
import { TPackingService } from '@/types/packing-services';

export default function PackingList() {
  const {
    packingServices,
    isLoading,
    error,
    updatePackingServices,
    isUpdating,
  } = usePackingServices();
  const [items, setItems] = useState<TPackingService[]>([]);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (packingServices) {
      setItems(packingServices);
    }
  }, [packingServices]);

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

  async function handleSaveChanges() {
    try {
      await updatePackingServices(items, {
        onSuccess: () => {
          toast.success('Changes saved successfully!');
          setOrderChanged(false);
        },
        onError: (error) => {
          toast.error(error.message);
          setItems(packingServices!);
        },
      });
    } catch (err) {
      toast.error('An unexpected error occurred.');
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton className="h-10 w-full" key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center text-muted-foreground">
        {error.message}
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-6">
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
          <div className="">
            {items.map((item) => (
              <PackingItem key={item.id} item={item} />
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
                setItems(packingServices!);
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
